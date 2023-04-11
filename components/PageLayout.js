import colors from "configs/colors";
import Head from "next/head";
import ThemeProvider, { useTheme } from "providers/ThemeProvider";
import React from "react";
import styled from "styled-components";
import GernericContainer from "./GernericContainer";
import Navbar from "./Navbar";

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  position: relative;

  &.light {
    background: ${colors.lightgrey};
    & p,
    h1,
    span {
      color: black;
    }
  }
  &.dark {
    background: ${colors.dark};
    & p,
    h1,
    span {
      color: ${colors.white};
    }

    & div::after {
      background: ${colors.darkestgrey};
    }
  }
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
  const { theme } = useTheme();

  return (
    <MainContainer className={theme.type}>
      <Container>
        <Navbar />
        <GernericContainer>{children}</GernericContainer>
      </Container>
    </MainContainer>
  );
};

export default PageLayout;
