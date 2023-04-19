import { PortableText } from "@portabletext/react";
import colors from "configs/colors";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { urlForImage } from "utils/helpers";
import HighlightCode from "./HighlightCode";

const InlinImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 20px 0;
  gap: 10px;
  & img {
    /* max-width: 50%;
    max-height: 50%;
    object-fit: contain; */
  }
  & span {
    color: ${colors.grey};
    font-size: 15px;
    font-weight: 600;
  }
`;

const TextContainer = styled.div`
  display: block;
  width: 100%;
  & p {
    margin: 10px auto;
    font-size: 20px;
    font-weight: 500;
  }
`;

const CodeFileName = styled.div`
  opacity: 0.6;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  & span {
    font-style: italic;
    font-size: 14px;
  }
`;

const serializer = {
  types: {
    image: ({ value }) =>
      value ? (
        <InlinImage>
          <Image
            priority
            alt={"Inline Article Image"}
            src={urlForImage(value).fit("max").toString()}
            width={320}
            height={240}
          />
          <span> {value?.alt}</span>
        </InlinImage>
      ) : (
        ""
      ),

    code: ({ value }) => (
      <HighlightCode language={value.language}>
        {value.code}
        {value.filename}
      </HighlightCode>
    ),
  },

  marks: {
    link: ({ children, value }) => {
      const { href } = value;

      const cleanUpHrefs = (href) => {
        let cleanHref = href;
        const paramsFromDirtyHref = new URL(href).searchParams;
        const params = Object.fromEntries(paramsFromDirtyHref.entries());
        cleanHref = cleanHref.replace(`?${paramsFromDirtyHref.toString()}`, "");
        switch (true) {
          case href.includes("https://tiomarkets.com"):
            cleanHref = cleanHref.replace(
              /(https\:\/\/tiomarkets.com\/\w{2}\/|https\:\/\/tiomarkets.com\/)/g,
              "/"
            );
            break;
          case href.includes("https://blog.tiomarkets.com"):
            cleanHref = cleanHref.replace(
              /https\:\/\/blog\.tiomarkets.com\/\w{2}\/education|https\:\/\/blog\.tiomarkets.com\/education/g,
              "/article"
            );
            break;
        }
        return { cleanHref, params };
      };

      return (
        <Link
          href={{
            pathname: cleanUpHrefs(href).cleanHref,
            query: cleanUpHrefs(href).params,
          }}
          passHref
        >
          {children}
        </Link>
      );
    },
    internalLink: ({ children, value }) => {
      if (value?.slug?.current) {
        return (
          <Link
            href={{
              pathname: value?.slug?.current,
            }}
            passHref
          >
            {children}
          </Link>
        );
      } else {
        return children;
      }
    },
  },
};

const TextContent = ({ blogData }) => {
  return (
    <TextContainer>
      <PortableText value={blogData?.body} components={serializer} />
    </TextContainer>
  );
};

export default TextContent;
