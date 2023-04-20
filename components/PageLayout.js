import colors from "configs/colors";
import Head from "next/head";
import ThemeProvider, { useTheme } from "providers/ThemeProvider";
import React, { useEffect } from "react";
import styled from "styled-components";
import GernericContainer from "./GernericContainer";
import Navbar from "./Navbar";

const MainContainer1 = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  transition: all 0.2s ease-in-out;
  /* &.light {
    background: ${colors.lightgrey};
    & > p,
    h1,
    span {
      color: black;
    }
  }
  &.dark {
    background: ${colors.darkmode};
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
      background: ${colors.cardDarkMode};
    }
  } */
`;

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  transition: all 0.2s ease-in-out;
  background: ${({ theme }) => colors[theme].background};

  svg {
    color: ${colors.purble};
  }

  & > p {
    color: ${({ theme }) => colors[theme].text};
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
  const [theme] = useTheme();

  return (
    <MainContainer theme={theme}>
      <Container>
        <Navbar />
        <GernericContainer>{children}</GernericContainer>
      </Container>
    </MainContainer>
  );
};

export default PageLayout;
