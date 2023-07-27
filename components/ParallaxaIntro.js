import colors from "configs/colors";
import {
  cloud,
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
  width: 2000px;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  background-color: ${({ theme }) =>
    theme == "dark" ? " rgb(0 0 0 / 50%)" : "unset"};

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
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: ${({ theme }) =>
      theme == "dark" ? " rgb(0 0 0 / 60%)" : "unset"};
  }

  .BgMountain {
    transition: all 1s linear;
    position: absolute;

    mix-blend-mode: saturation;
    min-width: 2000px;
    min-height: 2000px;
    transform: ${({ mouseMovmentX, mouseMovmentY }) =>
      `translate(calc(-1%  + ${mouseMovmentX / 20}px), calc(-1%  + ${
        mouseMovmentY / 5
      }px))`};

    object-fit: cover;
    top: 800px;
    margin: auto;
    bottom: 0;
    left: -50px;
    right: 0;
    width: 100%;
    height: 100%;
  }

  .Mountain1 {
    perspective: 1000000;
    mix-blend-mode: ${({ theme }) => (theme == "dark" ? "" : "unset")};
    transition: all 1s linear;
    position: absolute;

    transform: ${({ mouseMovmentX, mouseMovmentY }) =>
      `translate(calc(-1%  + ${mouseMovmentX / 10}px), calc(-1%  + ${
        mouseMovmentY / 3
      }px))`};
    object-fit: contain;
    max-width: 1500px;
    max-height: 950px;
    width: 100%;
    height: 100%;
    aspect-ratio: 1;
    left: 40%;
    top: 20%;
  }
  .Mountain2 {
    /* mix-blend-mode: hue; */
    perspective: 1000;
    transition: all 1s linear;
    position: absolute;
    object-fit: contain;
    max-width: 1600px;
    max-height: 1000px;
    width: 100%;
    height: 100%;
    transform: ${({ mouseMovmentX, mouseMovmentY }) =>
      `translate(max(calc(-2%  + ${mouseMovmentX / 5}px), 0px ), calc(-1%  + ${
        mouseMovmentY / 5
      }px))`};
    aspect-ratio: 1;
    right: 35%;
    top: 20%;
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
    top: ${({ scrollDirection }) =>
      scrollDirection === "down" ? "0%" : "90%"};
  }
  .cloud {
    position: absolute;
    object-fit: contain;
    max-width: 200px;
    max-height: 200px;
    width: 100%;
    height: 100%;
    left: 0;
    top: -10%;
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
        x: clamp(x, 0, -x, -200, 200),
        y: clamp(y, 0, -y, -200, 200),
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
      scrollDirection={scrollDirection}
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
        width={3800}
        height={3800}
        alt="mnt1"
      />
      <Image
        className="Mountain2"
        src={mountainL2}
        width={3800}
        height={3800}
        alt="mnt2"
      />

      <Image className="fog1" src={fog} width={3800} height={3800} alt="fog" />
    </Container>
  );
};

export default ParallaxaIntro;
