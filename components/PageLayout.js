import colors from "configs/colors";
import Head from "next/head";
import ThemeProvider, { useTheme } from "providers/ThemeProvider";
import React, { useEffect, useState } from "react";
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

const OuterContainer = styled.div`
  display: flex;
  /* overflow: hidden; */
  width: 100%;
  position: relative;
  background: ${({ theme }) => colors[theme].background};

  & > p {
    color: ${({ theme }) => colors[theme].text};
  }
`;

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  z-index: 2;
  transition: all 0.2s ease-in-out;

  svg {
    color: ${colors.purble};
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

const BigCircle = styled.div`
  display: flex;
  width: 1500px;
  z-index: 1;
  height: 1500px;
  border-radius: 50%;
  left: ${({ scrollY }) => (scrollY > 20 ? "10%" : "50%")};
  bottom: ${({ scrollY }) => scrollY * 0.5 + "px"};
  transition: 0.4s cubic-bezier(0.52, 0.01, 0.16, 1) 0s;
  background-color: #ffbf71;
  position: absolute;
`;

const PageLayout = ({ children }) => {
  const [theme] = useTheme();
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("down");
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setScrollDirection(window.scrollY > scrollY ? "down" : "up");
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY]);

  return (
    <OuterContainer theme={theme}>
      {/* <BigCircle scrollY={scrollY} /> */}
      <MainContainer>
        <Container>
          <Navbar />

          {children}
        </Container>
      </MainContainer>
    </OuterContainer>
  );
};

export default PageLayout;
