import React from "react";
import styled, { keyframes } from "styled-components";

const Type = keyframes`
  from {
    box-shadow: inset -3px 0px 0px #888;
  }
  to {
    box-shadow: inset -3px 0px 0px transparent;
  }
`;

const Main = styled.div`
  display: table;
  width: 100%;
  height: 60vh;
  text-align: center;
`;

const Fof = styled.div`
  display: table-cell;
  vertical-align: middle;

  & h1 {
    font-size: 50px;
    display: inline-block;
    padding-right: 12px;
    animation: ${Type} 0.5s alternate infinite;
  }
`;

const NotFound = () => {
  return (
    <Main>
      <Fof>
        <h1>Error 404</h1>
      </Fof>
    </Main>
  );
};

export default NotFound;

export const getStaticProps = async () => {
  return {
    props: {},
  };
};
