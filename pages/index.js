import AuthorIntro from "components/AuthorIntro";

import CardItem from "components/CardItem";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import CardListItem from "components/CardListItem";
import { useState } from "react";
import Link from "next/link";
import colors from "configs/colors";
import blogsService from "backend/services/blog.service";

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

const Button = styled(Link)`
  display: flex;
  justify-content: center;
  border: 1px solid ${colors.purble};
  padding: 10px;
  border-radius: 8px;
  width: 200px;
  text-decoration: none;
  color: ${colors.purble};
  transition: all 0.2s linear;
  :hover {
    background: ${colors.purble};
    color: ${colors.white};
  }
  /* width: 100%; */
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
    color: ${colors.white};
  }
`;

export default function Home({ allBlogs, pagesNumber }) {
  const [isList, setIsList] = useState(false);
  const [blogs, setBlogs] = useState(allBlogs);
  const [currPage, setCurrPage] = useState(0);

  const loadMore = async () => {
    setCurrPage(currPage + 1);
    if (pagesNumber[currPage + 1]) {
      const environmentUrl = process.env.NEXT_PUBLIC_ENVIRONMENT_URL;
      const extaBlogs = await axios
        .post(`${environmentUrl}/blogs/getAllBlogs`, {
          blogLimitStart: pagesNumber[currPage + 1] * 6 - 6,
          blogLimiteEnd: pagesNumber[currPage + 1] * 6,
        })
        .then((res) => res.data)
        .catch((err) => console.log(err));
      setBlogs((prevState) => [...prevState, ...extaBlogs]);
      console.log(extaBlogs);
    }
  };

  return (
    <Container>
      <AuthorIntro setIsList={setIsList} isList={isList} />
      <h1>Projects:{currPage[0]}</h1>
      <CardItemsContainer>
        {blogs?.map((curr, index) =>
          !isList ? (
            <CardItem key={index} curr={curr} />
          ) : (
            <CardListItem key={index} curr={curr} />
          )
        )}
        <ButtonContainer mWidth={isList}>
          <LoadMore
            canLoad={pagesNumber[currPage + 1]}
            onClick={() => pagesNumber[currPage + 1] && loadMore()}
          >
            <p>Load More</p>
          </LoadMore>
        </ButtonContainer>
      </CardItemsContainer>
    </Container>
  );
}

export async function getStaticProps(context) {
  const pagesNumber = await blogsService.getBlogCount();
  console.log(pagesNumber);

  const allBlogs = await axios
    .post(`${process.env.NEXT_PUBLIC_ENVIRONMENT_URL}/blogs/getAllBlogs`, {
      blogLimitStart: 0,
      blogLimiteEnd: 6,
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
