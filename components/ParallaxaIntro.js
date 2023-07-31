import colors from "configs/colors";
import {
  blackFog,
  cloud,
  clouds,
  fog,
  mountainL2,
  mountainR,
  parallaxbg,
  sunLight,
} from "configs/images";
import Image from "next/image";
import { useTheme } from "providers/ThemeProvider";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { clamp } from "utils/helpers";

const Container = styled.div`
  width: 100%;
  margin: auto;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  background-color: ${({ theme }) =>
    theme == "dark" ? " rgb(0 0 0 / 60%)" : "unset"};

  & > p {
    color: ${({ theme }) => colors[theme].text};
  }
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  transition: all 1s linear;
  background-position: ${({ mouseMovmentX, mouseMovmentY }) =>
    `calc(-10% + ${mouseMovmentX / 100}px) calc(-% + ${mouseMovmentY / 10}px)`};

  ::after {
    content: "";
    transition: all 1s linear;
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: ${({ theme }) =>
      theme == "dark" ? " rgb(0 0 0 / 70%)" : "unset"};
  }

  .BgMountain {
    transition: all 1s linear;
    position: absolute;

    mix-blend-mode: saturation;
    width: 120%;
    height: 180%;
    transform: ${({ mouseMovmentX, mouseMovmentY }) =>
      `translate(calc(-1%  + ${mouseMovmentX / 20}px), calc(-1%  + ${
        mouseMovmentY / 20
      }px))`};

    object-fit: cover;
    top: 00px;
    /* margin: auto; */
    bottom: 0;
    left: -50px;
    right: 0;
  }

  .Mountain1 {
    mix-blend-mode: ${({ theme }) => (theme == "dark" ? "" : "unset")};
    transition: all 1s linear;
    position: absolute;

    transform: ${({ mouseMovmentX, mouseMovmentY }) =>
      `translate(calc(-1%  + ${mouseMovmentX / 10}px), calc(-1%  + ${
        mouseMovmentY / 10
      }px))`};
    object-fit: contain;
    max-width: 1200px;
    max-height: 800px;
    width: 100%;
    height: 100%;
    right: -10%;
    bottom: -10%;
  }
  .Mountain2 {
    /* mix-blend-mode: hue; */
    perspective: 1000;
    transition: all 1s linear;
    position: absolute;
    object-fit: contain;
    max-width: 1500px;
    max-height: 1500px;
    width: 100%;
    height: 100%;
    transform: ${({ mouseMovmentX, mouseMovmentY }) =>
      `translate(max(calc(-2%  + ${mouseMovmentX / 5}px), 0px ), calc(-2%  + ${
        mouseMovmentY / 5
      }px))`};
    left: -20%;
    bottom: -40%;
  }
  .sunLight {
    position: absolute;
    object-fit: contain;
    max-width: 794px;
    max-height: 200px;
    width: 100%;
    height: 100%;
    transform: scaleX(-1);
    right: 0;
    top: 0;
  }

  .MountnBtm {
    position: absolute;
    object-fit: cover;
    width: 100%;
    height: 100%;
    transform: scaleX(-1);
    right: 0;
    top: 10%;
  }
  .fog1 {
    position: absolute;
    object-fit: cover;
    width: 100%;
    height: 100%;

    left: 0;
    transition: all 1s linear;
    top: ${({ scrollY }) => (scrollY > 50 ? "0%" : "120%")};
  }
  .cloud {
    position: absolute;
  }
`;

const Fog = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  /* background-color: red; */
  transition: all 1s linear;
  top: ${({ scrollY }) => (scrollY > 50 ? "0%" : "120%")};
  & img {
    object-fit: contain;
    /* display: none; */
    width: 100%;
    height: 100%;
    left: 0;
    top: -10%;
    mix-blend-mode: ${({ theme }) => (theme == "dark" ? "" : "unset")};
  }
  ::after {
    content: "";
    position: relative;
    margin-top: auto;
    width: 100%;
    height: 40%;
    background-color: transparent;
    border-radius: 20% 20% 0 0;
    box-shadow: 0px -220px 60px 0px rgb(241, 242, 244) inset;
  }
`;

const ParallaxaIntro = () => {
  const [theme] = useTheme();
  const ref = useRef(null);
  const [mouseMovment, setMouseMovment] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("down");

  const handleMouse = (e) => {
    if (ref.current) {
      let x = e.clientX - ref.current.clientWidth / 2; //check how far is mouse from the center of container in X axis
      let y = e.clientY - ref.current.clientHeight / 2; //check how far is mouse from the center of container in Y axis
      setMouseMovment({
        x: x,
        y: y,
      });
    }

    console.log(mouseMovment);
  };

  const handleMouseLeave = () => {
    setMouseMovment({ x: 0, y: 0 });
  };
  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("mousemove", (e) => handleMouse(e));
      ref.current.addEventListener("mouseleave", handleMouseLeave);
      console.log(mouseMovment);
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
      setScrollDirection(window.scrollY > scrollY ? "down" : "up");
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY]);

  return (
    <Container
      ref={ref}
      theme={theme}
      bg={parallaxbg}
      scrollY={scrollY}
      mouseMovmentX={mouseMovment.x}
      mouseMovmentY={mouseMovment.y}
    >
      <Image
        className="BgMountain"
        src={parallaxbg}
        width={3800}
        height={3800}
        alt="mnt1"
      />

      <Image
        className="Mountain1"
        src={mountainR}
        width={1900}
        height={2000}
        alt="mnt1"
      />
      <Image
        className="Mountain2"
        src={mountainL2}
        width={1900}
        height={2000}
        alt="mnt2"
      />
      {theme === "dark" ? (
        <Image
          className="fog1"
          src={blackFog}
          width={3800}
          height={3800}
          alt="fog"
        />
      ) : (
        <Fog scrollY={scrollY}>
          <Image
            className="fog1"
            src={clouds}
            width={3800}
            height={3800}
            alt="fog"
          />
        </Fog>
      )}
    </Container>
  );
};

export default ParallaxaIntro;
