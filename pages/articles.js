import React from "react";
import AuthorIntro from "components/AuthorIntro";
import CardItem from "components/CardItem";
import axios from "axios";
import styled from "styled-components";
import CardListItem from "components/CardListItem";
import { useState } from "react";
import colors from "configs/colors";
import blogsService from "backend/services/blog.service";
import Lottie from "components/common/Lottie";
import Loading from "../public/animations/loading.json";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { TbGridDots } from "react-icons/tb";
import GernericContainer from "components/GernericContainer";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
  /* padding: 10px 0; */
  position: relative;
  & > h1 {
    color: ${colors.purble};
    font-size: 30px;
    font-weight: 600;
  }
  & svg {
    /* position: absolute; */
    /* margin: 5px 0; */
    /* bottom: 97%; */

    /* bottom: 0; */
    transition: all 0.1s linear;
    :hover {
      /* width: 32px; */
      /* height: 32px; */
      scale: 1.1;
      color: ${colors.lightpurble};
    }
    cursor: pointer;
  }
`;

const CardItemsContainer = styled.div`
  width: 100%;
  border-top: 1px solid ${colors.darkergrey};
  padding: 10px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  padding: 20px 0;
  max-width: ${({ mWidth }) => (mWidth ? "1000px" : "100%")};
  display: flex;
  justify-content: center;
`;

const LoadMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid ${({ canLoad }) => (canLoad ? colors.purble : colors.grey)};
  padding: 10px;
  cursor: ${({ canLoad }) => (canLoad ? "pointer" : "default")};
  border-radius: 8px;
  width: 200px;
  text-decoration: none;
  transition: all 0.2s linear;
  :hover {
    background: ${({ canLoad }) => (canLoad ? colors.purble : "")};
    & p {
      color: ${({ canLoad }) => (canLoad ? colors.white : "")};
    }
  }
  & p {
    color: ${({ canLoad }) => (canLoad ? colors.purble : colors.grey)};
  }
`;

const Articles = ({ allBlogs, pagesNumber }) => {
  const [isList, setIsList] = useState(false);
  const [blogs, setBlogs] = useState(allBlogs);
  const [currPage, setCurrPage] = useState(0);
  const [isloading, setIsLoading] = useState(false);

  const loadMore = async () => {
    setCurrPage(currPage + 1);
    setIsLoading(true);
    if (pagesNumber[currPage + 1]) {
      try {
        const extaBlogs = await axios.post(`/api/blogs/getAllBlogs`, {
          blogLimitStart: pagesNumber[currPage + 1] * 3 - 3,
          blogLimiteEnd: pagesNumber[currPage + 1] * 3,
        });

        setBlogs((prevState) => [...prevState, ...extaBlogs.data]);
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    }
  };
  return (
    <GernericContainer>
      <Container>
        {/* <AuthorIntro setIsList={setIsList} isList={isList} /> */}
        {!isList ? (
          <AiOutlineUnorderedList
            size={30}
            onClick={() => setIsList(!isList)}
          />
        ) : (
          <TbGridDots size={30} onClick={() => setIsList(!isList)} />
        )}
        <CardItemsContainer>
          <>
            {blogs?.map((curr, index) =>
              !isList ? (
                <CardItem key={index} curr={curr} />
              ) : (
                <CardListItem key={index} curr={curr} />
              )
            )}
          </>

          <ButtonContainer mWidth={isList}>
            <LoadMoreContainer
              canLoad={pagesNumber.indexOf(pagesNumber[currPage + 1]) > -1}
              onClick={() => {
                if (pagesNumber.indexOf(pagesNumber[currPage + 1]) > -1)
                  loadMore();
              }}
            >
              {isloading ? (
                <Lottie
                  animationData={Loading}
                  loop={true}
                  autoPlay={true}
                  style={{
                    margin: "auto",
                    height: 30,
                    width: 30,
                  }}
                />
              ) : (
                <p>More Blogs</p>
              )}
            </LoadMoreContainer>
          </ButtonContainer>
        </CardItemsContainer>
      </Container>
    </GernericContainer>
  );
};

export default Articles;

export async function getStaticProps(context) {
  const pagesNumber = await blogsService.getBlogCount();

  const allBlogs = await blogsService.getAllBlogs({
    blogLimitStart: 0,
    blogLimiteEnd: 3,
  });

  return {
    revalidate: 60,
    props: {
      allBlogs,
      pagesNumber,
    },
  };
}
