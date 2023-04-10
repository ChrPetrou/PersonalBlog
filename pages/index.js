import AuthorIntro from "components/AuthorIntro";

import CardItem from "components/CardItem";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import CardListItem from "components/CardListItem";
import { useState } from "react";

const CardItemsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export default function Home({ allBlogs }) {
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
}

export async function getStaticProps(context) {
  const allBlogs = await axios
    .get(`${process.env.NEXT_ENVIROMENT_URL}/blogs/getAllBlogs`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return {
    props: {
      allBlogs,
    },
  };
}
