import {
  mountainBottom,
  mountainL,
  mountainL2,
  mountainR,
  parallaxbg,
  sunLight,
} from "configs/images";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  margin: auto;
  max-width: 2000px;
  overflow: hidden;
  min-height: 800px;
  display: flex;
  /* background-image: ${({ bg }) => `url(${bg})`}; */
  background-size: cover;
  background-position: top;
  background-repeat: repeat;
  position: relative;
  transition: all 1s linear;

  .BgMountain {
    perspective: 1000;
    transition: all 1s linear;
    position: absolute;
    min-width: 2000px;
    min-height: 2000px;
    transform: ${({ mouseMovmentX, mouseMovmentY }) =>
      `translate(calc(-1%  + ${mouseMovmentX / 20}px), calc(-1%  + ${
        mouseMovmentY / 10
      }px))`};
    object-fit: cover;
    top: 700px;
    margin: auto;
    bottom: 0;
    left: -50px;
    right: 0;
    width: 100%;
    height: 100%;
  }

  .Mountain1 {
    perspective: 1000;
    transition: all 1s linear;
    position: absolute;

    transform: ${({ mouseMovmentX, mouseMovmentY }) =>
      `translate(calc(-50%  + ${mouseMovmentX}px), calc(-10%  + ${mouseMovmentY}px))`};
    object-fit: contain;
    max-width: 1300px;
    max-height: 750px;
    width: 100%;
    height: 100%;
    aspect-ratio: 1;
    left: 40%;
    top: 20%;
  }
  .Mountain2 {
    perspective: 1000;
    transition: all 1s linear;
    position: absolute;
    object-fit: contain;
    max-width: 1300px;
    max-height: 900px;
    width: 100%;
    height: 100%;
    /* transform: ${({ mouseMovmentX, mouseMovmentY }) =>
      `translate(${mouseMovmentX / 5 + "px"}, ${
        mouseMovmentY / 50 + "px"
      })`}; */
    aspect-ratio: 1;
    right: 55%;
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
    /* max-width: 794px; */
    /* max-height: 400px; */
    width: 100%;
    height: 100%;
    transform: scaleX(-1);
    right: 0;
    top: 10%;
  }
`;
const ParallaxaIntro = () => {
  const ref = useRef(null);
  const [mouseMovment, setMouseMovment] = useState({ x: 0, y: 0 });
  console.log(ref.current);

  const handleMouse = (e) => {
    if (ref.current) {
      let x = e.clientX - ref.current.clientWidth / 2; //check how far is mouse from the center of container in X axis
      let y = e.clientY - ref.current.clientHeight / 2; //check how far is mouse from the center of container in Y axis
      setMouseMovment({ x, y });
    }

    // setMouseMovment(window.innerWidth);

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

  return (
    <Container
      ref={ref}
      bg={parallaxbg}
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
      <Image
        className="sunLight"
        src={sunLight}
        width={3800}
        height={3800}
        alt="mnt2"
      />
    </Container>
  );
};

export default ParallaxaIntro;
