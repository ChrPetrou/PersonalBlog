import colors from "configs/colors";
import Head from "next/head";
import React from "react";
import styled from "styled-components";
import GernericContainer from "./GernericContainer";
// import { Container } from "react-bootstrap";
import Navbar from "./Navbar";

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  background: ${colors.lightgrey};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  min-height: 100vh;
  margin: auto;
`;

const PageLayout = ({ children }) => {
  return (
    <>
      <Head>
        <link
        // href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;900&display=swap"
        // rel="stylesheet"
        />
      </Head>
      <MainContainer>
        <Container>
          <Navbar />
          <GernericContainer>{children}</GernericContainer>
        </Container>
      </MainContainer>
    </>
  );
};

export default PageLayout;
