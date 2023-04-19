import React, { createRef, useEffect, useRef } from "react";
import highlight from "highlight.js";
import { findDOMNode } from "react-dom";
import styled from "styled-components";

const CodeFileName = styled.pre`
  margin: 20px 0;

  .hljs {
    padding: 20px;
    border-radius: 10px;
  }
`;

const HighlightCode = ({ children, language }) => {
  const codeRef = useRef(null);

  useEffect(() => {
    highlight.highlightElement(codeRef.current);
  }, []);

  return (
    <CodeFileName>
      <code ref={codeRef} className={language}>
        {children}
      </code>
    </CodeFileName>
  );
};

export default HighlightCode;
