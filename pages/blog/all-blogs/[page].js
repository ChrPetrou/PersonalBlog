import axios from "axios";
import blogsService from "backend/services/blog.service";
import AuthorIntro from "components/AuthorIntro";
import CardItem from "components/CardItem";
import CardListItem from "components/CardListItem";
import React, { useState } from "react";
import styled from "styled-components";

const CardItemsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const AllBlogs = ({ allBlogs }) => {
  const [isList, setIsList] = useState(false);
  return (
    <>
      <AuthorIntro setIsList={setIsList} isList={isList} />

      <CardItemsContainer>
        {allBlogs.map((curr, index) =>
          !isList ? (
            <CardItem key={index} curr={curr} />
          ) : (
            <CardListItem key={index} curr={curr} />
          )
        )}
      </CardItemsContainer>
    </>
  );
};

export default AllBlogs;

export async function getStaticPaths(context) {
  const pageNumbers = await blogsService.getBlogCount();
  return {
    paths: pageNumbers?.map((page) => ({
      params: { page: String(page) },
    })),
    fallback: true,
  };
}

export async function getStaticProps(context) {
  console.log(context);
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
    },
  };
}
