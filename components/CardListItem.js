import colors from "configs/colors";
import { dummImg } from "configs/images";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "providers/ThemeProvider";
import React from "react";

import styled, { keyframes } from "styled-components";
import { dateNow, urlForImage } from "utils/helpers";

const backgroundAnimation = keyframes`
 0% {background-position: 0% 50%;}
  50% {background-position: 100% 50%;}
  100% {background-position: 0% 50%;}
`;

const Card = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  border-radius: 15px;
  color: ${({ theme }) => colors[theme].text};
  margin: 20px 0;
  width: 100%;
  max-width: 1000px;
  border: 1px solid ${colors.darkergrey};
  box-shadow: 10px 10px 28px -6px rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: 10px 10px 28px -6px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 10px 10px 28px -6px rgba(0, 0, 0, 0.4);
  position: relative;
  padding: 10px;
  z-index: 4;
  :hover::before {
    opacity: 1;
    box-shadow: none;
  }
  ::before {
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
    inset: 2px;
    opacity: 0;
    border-radius: 10px;
    filter: blur(10px);
    /* transform: translateZ(-1px); */
    z-index: 0;
    animation: ${backgroundAnimation} 5s linear infinite;
  }

  ::after {
    content: "";

    background: ${({ theme }) => colors[theme].linkColor};
    position: absolute;
    inset: 0;
    width: 100%;
    z-index: 1;
    opacity: 1;
    border-radius: 14px;
  }
  @media only screen and (max-width: 750px) {
    width: 100%;
  }
`;

const PlaceHolderContainer = styled.div`
  display: flex;
  padding: 10px;
  z-index: 2;
  gap: 20px;
  width: 100%;
  border-bottom: 1px solid ${colors.lightgrey};
`;

const ImagePlaceHolder = styled.div`
  border-radius: 25px;
  width: 100%;
  overflow: hidden;
  width: 50px;
  height: 50px;
  position: relative;
`;

const DetailsPlaceHolder = styled.div`
  display: flex;
  z-index: 2;
  flex-direction: column;
  & > h1 {
    font-size: 15px;
    font-weight: 700;
  }
  & p {
    color: ${colors.grey};
    font-size: 12px;
    font-weight: 500;
  }
`;

const PlaceHolderTitle = styled.div`
  display: flex;
  padding: 10px;
  gap: 10px;
  z-index: 2;
  flex-direction: column;
  & > h1 {
    font-size: 15px;
    font-weight: 700;
  }
  & p {
    color: ${colors.grey};
    font-size: 12px;
    font-weight: 500;
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
  padding: 10px;
  border-radius: 0px 0px 5px 5px;
  box-shadow: inset 0px 13px 12px -13px rgb(0 0 0 / 71%);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.1s linear;

  :hover {
    padding: 15px;
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
    /* right: 0;
    top: 0; */
    width: 100%;
    height: 100%;
    box-shadow: 1px -15px 20px -10px rgba(0, 0, 0, 0.71) inset;
    -webkit-box-shadow: 1px -15px 20px -10px rgba(0, 0, 0, 0.71) inset;
    -moz-box-shadow: 1px -15px 20px -10px rgba(0, 0, 0, 0.71) inset;
  }
`;

const CardListItem = ({ curr }) => {
  const [theme] = useTheme();
  return (
    <Card theme={theme}>
      <PlaceHolderContainer>
        <ImagePlaceHolder>
          <Image
            fill
            src={urlForImage(curr?.author?.image)
              .width(65)
              .height(65)
              .fit("max")
              .url()}
            alt={curr?.author?.name}
            priority
          />
        </ImagePlaceHolder>
        <DetailsPlaceHolder>
          <h1>{curr?.author?.name}</h1>
          <p>{dateNow(curr?.date)}</p>
        </DetailsPlaceHolder>
      </PlaceHolderContainer>
      {/* <hr /> */}
      <PlaceHolderTitle>
        <h1>{curr?.title}</h1>
        <p>{curr?.subtitle}</p>
      </PlaceHolderTitle>
      <ReadMore href={{ pathname: `/blog/${curr?.slug}` }} passHref>
        <p>Read More</p>
      </ReadMore>
    </Card>
  );
};

export default CardListItem;
