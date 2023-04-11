import AuthorIntro from "components/AuthorIntro";

import CardItem from "components/CardItem";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import CardListItem from "components/CardListItem";
import { useState } from "react";
import Link from "next/link";
import colors from "configs/colors";
import blogsService from "backend/services/blog.service";
import Lottie from "components/common/Lottie";
import Loading from "../public/animations/loading.json";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
  & > h1 {
    color: ${colors.purble};
    font-size: 30px;
    font-weight: 600;
  }
`;

const CardItemsContainer = styled.div`
  width: 100%;

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

const LoadMore = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid
    ${({ canLoad }) => (canLoad ? colors.purble : colors.darkergrey)};
  padding: 10px;
  cursor: ${({ canLoad }) => (canLoad ? "pointer" : "defualt")};
  border-radius: 8px;
  width: 200px;
  text-decoration: none;
  color: ${({ canLoad }) => (canLoad ? colors.purble : colors.darkergrey)};
  transition: all 0.2s linear;
  :hover {
    background: ${({ canLoad }) => (canLoad ? colors.purble : "")};
    color: ${({ canLoad }) => (canLoad ? colors.white : "")};
  }
`;

export default function Home({ allBlogs, pagesNumber }) {
  const [isList, setIsList] = useState(false);
  const [blogs, setBlogs] = useState(allBlogs);
  const [currPage, setCurrPage] = useState(0);
  const [isloading, setIsLoading] = useState(false);

  const loadMore = async () => {
    setCurrPage(currPage + 1);
    setIsLoading(true);
    if (pagesNumber[currPage + 1]) {
      const environmentUrl = process.env.NEXT_PUBLIC_ENVIRONMENT_URL;
      const extaBlogs = await axios
        .post(`${environmentUrl}/blogs/getAllBlogs`, {
          blogLimitStart: pagesNumber[currPage + 1] * 3 - 3,
          blogLimiteEnd: pagesNumber[currPage + 1] * 3,
        })
        .then((res) => {
          setIsLoading(false);
          return res.data;
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
      setBlogs((prevState) => [...prevState, ...extaBlogs]);
    }
  };

  return (
    <Container>
      <AuthorIntro setIsList={setIsList} isList={isList} />
      <h1>Projects:{currPage[0]}</h1>
      <CardItemsContainer>
        {isloading ? (
          <Lottie
            animationData={Loading}
            loop={true}
            autoPlay={true}
            style={{
              margin: "auto",
              height: 80,
              width: 80,
            }}
          />
        ) : (
          <>
            {blogs?.map((curr, index) =>
              !isList ? (
                <CardItem key={index} curr={curr} />
              ) : (
                <CardListItem key={index} curr={curr} />
              )
            )}
          </>
        )}
        <ButtonContainer mWidth={isList}>
          <LoadMore
            canLoad={pagesNumber[currPage + 1]}
            onClick={() => pagesNumber[currPage + 1] && loadMore()}
          >
            <p>More Blogs</p>
          </LoadMore>
        </ButtonContainer>
      </CardItemsContainer>
    </Container>
  );
}

export async function getStaticProps(context) {
  const pagesNumber = await blogsService.getBlogCount();

  const allBlogs = await axios
    .post(`${process.env.NEXT_PUBLIC_ENVIRONMENT_URL}/blogs/getAllBlogs`, {
      blogLimitStart: 0,
      blogLimiteEnd: 3,
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return {
    props: {
      allBlogs,
      pagesNumber,
    },
  };
}
