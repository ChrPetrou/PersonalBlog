import colors from "configs/colors";
import { blackClouds, clouds, parallaxbg } from "configs/images";
import Image from "next/image";
import { useTheme } from "providers/ThemeProvider";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  margin: auto;
  overflow: hidden;
  /* min-height: 100vh; */
  display: flex;
  background-color: ${({ theme }) =>
    theme == "dark" ? " rgb(0 0 0 / 80%)" : "unset"};

  & > p {
    color: ${({ theme }) => colors[theme].text};
  }

  position: relative;
`;

const ContainerInner = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  transition: all 1s linear;
  background-attachment: fixed;
  background-size: 120%;
  background-repeat: no-repeat;
  background-image: ${({ bg }) => `url(${bg})`};
  mix-blend-mode: saturation;
  background-position-x: ${({ mouseMovmentX, mouseMovmentY }) =>
    `calc(50%  + ${mouseMovmentX / 40}px)`};
  background-position-y: ${({ mouseMovmentY }) =>
    `calc(30%  + ${mouseMovmentY / 40}px)`};
`;

const Fog = styled.div`
  /* display: flex; */
  width: 100%;
  height: 100%;
  /* min-height: 500px; */
  position: relative;
  left: 0;
  z-index: 2;
  transition: all 0.5s linear;
  bottom: ${({ scrollY }) => `calc(min(${scrollY * 5 - 800}px,0px))`};

  /* transform: ${({ scrollY }) => `translateY(calc(${-scrollY / 2}%)))`}; */
  & img {
    /* position: absolute; */
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  ::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    margin-top: auto;
    width: 100%;
    height: 40%;
    background-color: transparent;
    border-radius: 20% 20% 0 0;
    box-shadow: ${({ theme }) =>
      theme === "dark"
        ? "0px -220px 60px 0px rgb(17, 17, 17) inset;"
        : "0px -220px 60px 0px rgb(241, 242, 244) inset;"};
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
        ref={ref}
        bg={parallaxbg}
        scrollY={scrollY}
        mouseMovmentX={mouseMovment.x}
        mouseMovmentY={mouseMovment.y}
      >
        <Fog theme={theme} scrollY={scrollY}>
          {theme === "dark" ? (
            <Image
              // className="fog1"
              src={blackClouds}
              width={3800}
              height={3800}
              alt="fog"
            />
          ) : (
            <Image
              // className="fog1"
              src={clouds}
              width={3800}
              height={3800}
              alt="fog"
            />
          )}
        </Fog>
      </ContainerInner>
    </Container>
  );
};

export default ParallaxIntroNew;
