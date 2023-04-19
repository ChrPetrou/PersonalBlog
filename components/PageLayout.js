import colors from "configs/colors";
import Head from "next/head";
import ThemeProvider, { useTheme } from "providers/ThemeProvider";
import React, { useEffect } from "react";
import styled from "styled-components";
import GernericContainer from "./GernericContainer";
import Navbar from "./Navbar";

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  transition: all 0.2s ease-in-out;
  &.light {
    background: ${colors.lightgrey};
    & > p,
    h1,
    span {
      color: black;
    }
  }
  &.dark {
    background: #141218;
    & p,
    h1,
    span,
    a,
    h2 {
      color: ${colors.white};
    }

    & svg {
      color: ${colors.white};
    }

    & div::after {
      background: #1d1c23;
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
  const { theme, toggleTheme } = useTheme();

  return (
    <MainContainer className={theme?.type}>
      <Container>
        <Navbar />
        <GernericContainer>{children}</GernericContainer>
      </Container>
    </MainContainer>
  );
};

export default PageLayout;
