import colors from "configs/colors";
import {
  mountainL2,
  clouds,
  parallaxbg,
  mountainR,
  parallaxbg2,
} from "configs/images";
import Image from "next/image";
import { useTheme } from "providers/ThemeProvider";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import styled, { keyframes } from "styled-components";

const Container = styled.div`
  width: 100%;
  margin: auto;
  overflow: hidden;
  background: ${({ theme }) =>
    theme == "dark" ? "rgb(17 17 17 / 80%)" : "unset"};
  display: flex;
  & > p {
    color: ${({ theme }) => colors[theme].text};
  }

  position: relative;
`;

const ContainerInner = styled.div`
  width: 100%;
  height: 200%;
  min-height: 130vh;
  transition: background-position 1s linear;
  background-attachment: fixed;
  background-size: 120%;
  background-repeat: no-repeat;
  background-image: ${({ bg }) => `url(${bg})`};
  mix-blend-mode: saturation;
  background-position-x: ${({ mouseMovmentX, mouseMovmentY }) =>
    `calc(20%  + ${mouseMovmentX / 40}px)`};
  background-position-y: ${({ mouseMovmentY }) =>
    `calc(70%  + ${mouseMovmentY / 40}px)`};
`;

const fadeIn = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(50px);
  }
  100% {
    transform:  translateY(0px);
  }
`;

const FarMountain = styled.div`
  display: flex;

  position: absolute;
  transition: background-position 1s linear;
  left: -20%;
  bottom: 20%;
  height: auto;
  width: 70%;

  background-attachment: fixed;
  /* background-size: 100%; */
  background-image: ${({ bg }) => `url(${bg})`};
  background-repeat: no-repeat;
  /* background-position-x: ${({ mouseMovmentX, mouseMovmentY }) =>
    `calc(50%  + ${mouseMovmentX / 40}px)`};
  background-position-y: ${({ mouseMovmentY }) =>
    `calc(30%  + ${mouseMovmentY / 40}px)`}; */
  & img {
    width: 100%;
    height: 100%;
    /* min-height: 1200px; */
    object-fit: cover;
  }
`;

const CloseMountain = styled.div`
  display: flex;

  position: absolute;
  transition: background-position 1s linear;
  right: -5%;
  bottom: 20%;
  height: auto;
  width: 50%;
  background-attachment: fixed;
  /* background-size: 100%; */
  background-image: ${({ bg }) => `url(${bg})`};
  background-repeat: no-repeat;
  & img {
    width: 100%;
    height: 100%;
    /* min-height: 1200px; */
    object-fit: cover;
  }
`;

const Fog = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;

  transition: 0.15s cubic-bezier(0.52, 0.01, 0.16, 1) 0s;
  bottom: ${({ scrollY }) => `calc(min(${scrollY * 5}px - 50%,0px))`};
  position: absolute;

  & img {
    z-index: 2;
    object-fit: contain;
    width: 100%;
    height: 100%;
    animation: ${fadeIn} 10s infinite ease-in-out;
  }
  ::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    margin-top: auto;
    width: 100%;
    height: 60%;
    filter: blur(30px);
    background-color: rgb(241 242 244 / 90%);
    border-radius: 20% 20% 0 0;
    box-shadow: ${({ theme }) =>
      theme === "dark"
        ? "0px -220px 120px 0px  rgb(14 14 14) inset;"
        : "0px -220px 120px 0px rgb(241, 242, 244) inset;"};
  }
  ::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    margin-top: auto;
    width: 100%;
    height: 50%;
    /* filter: blur(30px); */
    background-color: transparent;
    border-radius: 20% 20% 0 0;
    box-shadow: ${({ theme }) =>
      theme === "dark"
        ? "0px -220px 120px 0px  rgb(14 14 14) inset;"
        : "0px -220px 120px 0px rgb(241, 242, 244) inset;"};
  }
`;

const ParallaxIntroNew = () => {
  const [theme] = useTheme();
  const [mouseMovment, setMouseMovment] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const ref = useRef(null);

  const handleMouse = (e) => {
    if (ref.current) {
      let x = e.clientX - ref.current.clientWidth / 2; //check how far is mouse from the center of container in X axis
      let y = e.clientY - ref.current.clientHeight / 2; //check how far is mouse from the center of container in Y axis
      setMouseMovment({
        x: x,
        y: y,
      });
    }
  };

  const handleMouseLeave = () => {
    setMouseMovment({ x: 0, y: 0 });
  };
  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("mousemove", (e) => handleMouse(e));
      ref.current.addEventListener("mouseleave", handleMouseLeave);
    }
    return () => {
      if (ref.current) {
        ref.current.removeEventListener("mousemove", (e) => handleMouse(e));
        ref.current.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [mouseMovment]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY]);

  return (
    <Container theme={theme}>
      <ContainerInner
        theme={theme}
        ref={ref}
        bg={parallaxbg2}
        scrollY={scrollY}
        mouseMovmentX={mouseMovment.x}
        mouseMovmentY={mouseMovment.y}
      >
        <CloseMountain
          // bg={mountainL2}
          scrollY={scrollY}
          mouseMovmentX={mouseMovment.x}
          mouseMovmentY={mouseMovment.y}
        >
          <Image src={mountainR} width={2500} height={1200} alt="fog" />
        </CloseMountain>
        <FarMountain
          // bg={mountainL2}
          scrollY={scrollY}
          mouseMovmentX={mouseMovment.x}
          mouseMovmentY={mouseMovment.y}
        >
          <Image src={mountainL2} width={2500} height={1200} alt="fog" />
        </FarMountain>
        <Fog theme={theme} scrollY={scrollY}>
          {theme === "dark" ? (
            <Image src={clouds} width={3800} height={3800} alt="fog" />
          ) : (
            <Image src={clouds} width={3800} height={3800} alt="fog" />
          )}
        </Fog>
      </ContainerInner>
    </Container>
  );
};

export default ParallaxIntroNew;
