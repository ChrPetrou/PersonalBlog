import colors from "configs/colors";
import { myprof } from "configs/images";
import Image from "next/image";

import React from "react";
// import { Row, Col, Media, Image } from "react-bootstrap"
import styled from "styled-components";
import { useTheme } from "providers/ThemeProvider";

const AuthorContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  position: relative;
  /* border-bottom: 1px solid ${colors.darkergrey}; */
  padding: 20px 0px;
  color: ${({ theme }) => colors[theme].text};
`;

const AuthorContainerInner = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  padding: 20px 0px;
`;

const ImageContainer = styled.div`
  border-radius: 40px;
  overflow: hidden;
  width: 80px;
  height: 80px;
`;

const ContextContainer = styled.div`
  display: flex;
  flex-direction: column;
  & p {
    font-size: 17px;
    font-weight: 400;
  }
  & span {
    font-size: 17px;
    font-weight: 600;
  }
`;

const AuthorIntro = ({ setIsList, isList }) => {
  const [theme] = useTheme();
  return (
    <AuthorContainer theme={theme}>
      <AuthorContainerInner>
        <ImageContainer>
          <Image src={myprof} width={80} height={80} alt={"myprof"} />
        </ImageContainer>
        <ContextContainer>
          <span>Hello Friends,</span>
          <p>
            My name is Chris Petrou and I am a junior Full-stack developer.This
            is my blog page.
          </p>
        </ContextContainer>
      </AuthorContainerInner>
    </AuthorContainer>
  );
};

export default AuthorIntro;
