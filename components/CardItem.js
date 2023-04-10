import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import colors from "configs/colors";
import Image from "next/image";
import {
  clamp,
  dateNow,
  sanityImageDimensions,
  urlForImage,
} from "utils/helpers";
import Link from "next/link";

const backgroundAnimation = keyframes`
 0% {background-position: 0% 50%;}
  50% {background-position: 100% 50%;}
  100% {background-position: 0% 50%;}
`;

const CardContainer = styled.div`
  transform-style: preserve-3d;
  transition: 0.2s linear;
  transition-property: transform, scale;
  /* transform-origin: center; */
  width: calc((100% / 3) - (40px / 3));
  position: relative;
  border-radius: 10px;
  backface-visibility: hidden;
  border: 1px solid ${colors.darkergrey};
  margin-bottom: 35px;
  padding: 20px;

  h1,
  p,
  span,
  img {
    filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.2));
  }
  :hover {
    scale: 1.02;
    h1,
    p,
    span,
    img {
      filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.2));
    }
  }
  &:hover::before {
    opacity: 1;
  }
  &::before {
    transition: all 0.2s linear;
    content: "";
    background: linear-gradient(
        45deg,
        #1c7fee 60%,
        #5f15f2 70%,
        #ba0cf8 80%,
        #fb07d9 90%,
        #ff0000 100%
      )
      repeat 0% 0% / 300% 100%;
    position: absolute;
    inset: 3px;
    opacity: 0;
    border-radius: 10px;
    filter: blur(9px);
    transform: translateZ(-1px);
    z-index: 0;
    animation: ${backgroundAnimation} 5s linear infinite;
  }
  ::after {
    content: "";
    background-color: #fff;
    position: absolute;
    inset: 0;
    z-index: 1;
    border-radius: 10px;
  }
  @media only screen and (max-width: 750px) {
    width: 100%;
  }
`;

const RotativeDiv = styled.div`
  display: flex;
  position: absolute;
  background: transparent;
  /* background: red; */
  scale: 1.05;
  inset: 1px;
  z-index: 10;
  transform: translateZ(80px) scale(1);
`;

const CardDepth = styled(Link)`
  width: 100%;
  text-decoration: none;
  color: ${colors.dark};
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  perspective: inherit;
  padding: 10px;

  transform: translateZ(80px) scale(1);
`;

const CardHeader = styled.div`
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
  z-index: 2;
  width: 100%;
  flex-direction: row;
  gap: 10px;
`;

const CardImage = styled.div`
  display: flex;
  border-radius: 100%;
  border: 1px solid ${colors.darkestgrey};

  align-items: center;
  width: 50px;
  height: 50px;
  position: relative;
  z-index: 2;
  & img {
    border-radius: 100%;
    object-fit: contain;
    width: 100%;
    max-width: 50px;
    height: 100%;
    max-height: 50px;
  }
`;

const CardHeaderDetails = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  max-width: 200px;
  & h1 {
    font-size: 18px;
    font-weight: 600;
  }
  & span {
    color: ${colors.grey};
    font-size: 12px;
  }
`;

const CardDetails = styled.div`
  display: flex;
  z-index: 2;
  /* gap: 20px; */
  flex-direction: column;
  justify-content: flex-end;
  /* flex-wrap: wrap; */
  width: 100%;
`;

const CardDetailsImg = styled.div`
  display: flex;
  z-index: 2;
  width: 100%;
  max-height: 200px;
  img {
    object-fit: cover;
    object-position: bottom;
    width: 100%;
    height: 100%;
  }
`;

const CardDetailsContent = styled.div`
  display: flex;
  padding: 20px 0;
  gap: 15px;
  flex-direction: column;
  & p {
    font-size: 20px;
    font-weight: 600;
  }
`;

const ReadMore = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  background: ${colors.darkestgrey};
  right: 20px;
  text-decoration: none;
  top: 100%;
  width: 150px;
  padding: 8px;
  border-radius: 0px 0px 5px 5px;
  box-shadow: inset 0px 13px 12px -13px rgb(0 0 0 / 71%);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.1s linear;

  :hover {
    padding: 10px;
  }
  & p {
    color: ${colors.white};
    margin: auto;
    font-size: 15px;
    font-weight: 600;
  }
  ::after {
    cursor: pointer;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    box-shadow: 1px -16px 0px -10px rgba(0, 0, 0, 0.71) inset;
    -webkit-box-shadow: 1px -16px 0px -10px rgba(0, 0, 0, 0.71) inset;
    -moz-box-shadow: 1px -16px 0px -10px rgba(0, 0, 0, 0.71) inset;
  }
`;

const CardItem = ({ curr }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const refContainer = useRef();

  return (
    <>
      <CardContainer
        ref={refContainer}
        style={{
          transform: `perspective(120000px) rotateY(${mousePosition.x}deg)  rotateX(${mousePosition.y}deg)`,
        }}
        mouseMove={mousePosition}
      >
        <CardDepth
          href={{ pathname: `/blog/${curr?.slug}` }}
          passHref
          onMouseMove={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <CardHeader>
            <CardImage>
              <Image
                src={urlForImage(curr?.author?.image)
                  .width(65)
                  .height(65)
                  .fit("max")
                  .url()}
                width={64}
                height={64}
                alt="author avatar"
                priority
              />
            </CardImage>
            <CardHeaderDetails>
              <h1>{curr?.author?.name}</h1>
              <span>{dateNow(curr?.date)}</span>
            </CardHeaderDetails>
          </CardHeader>
          <CardDetailsImg>
            {curr?.coverImage && (
              <Image
                priority
                src={urlForImage(curr?.coverImage).fit("max").url()}
                height={sanityImageDimensions(curr?.coverImage).height / 5}
                width={sanityImageDimensions(curr?.coverImage).width / 5}
                alt={curr?.title}
              />
            )}
          </CardDetailsImg>

          <CardDetails>
            <CardDetailsContent>
              <p>{curr?.title}</p>
              <span>{curr?.subtitle}</span>
            </CardDetailsContent>
          </CardDetails>
        </CardDepth>
        <ReadMore href={{ pathname: `/blog/${curr?.slug}` }} passHref>
          <p>Read More</p>
        </ReadMore>
        <Link href={{ pathname: `/blog/${curr?.slug}` }} passHref>
          <RotativeDiv
            onMouseLeave={(e) => setMousePosition({ x: 0, y: 0 })}
            onMouseMove={(e) => {
              const xAxis = e.nativeEvent.offsetX;
              const yAxis = e.nativeEvent.offsetY;
              setMousePosition((prev) => ({
                x: clamp(xAxis, 0, refContainer.current.clientWidth, -15, 15),
                y:
                  clamp(yAxis, 0, refContainer.current.clientWidth, -15, 15) *
                  -1, // Math.max(e.nativeEvent.offsetY, 456)) / 10,
              }));
            }}
          />
        </Link>
      </CardContainer>
    </>
  );
};

export default CardItem;
