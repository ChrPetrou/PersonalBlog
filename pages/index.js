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

export default function Home() {
  return (
    <Container>
      <AuthorIntro />
    </Container>
  );
}

export async function getStaticProps(context) {
  return {
    props: {},
  };
}
