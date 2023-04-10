import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  min-height: 100vh;
  gap: 20px;
  margin: auto;
`;

const GernericContainer = ({ children }) => {
  return <Container>{children}</Container>;
};

export default GernericContainer;
