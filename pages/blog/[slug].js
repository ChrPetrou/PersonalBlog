import { PortableText } from "@portabletext/react";
import axios from "axios";

import TextContent from "components/TextContent";
import colors from "configs/colors";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "providers/ThemeProvider";
import React from "react";
import styled from "styled-components";
import { dateNow, sanityImageDimensions, urlForImage } from "utils/helpers";

const SlugContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-top: 1px solid ${colors.darkergrey};
  padding: 20px 0;
`;

const SlugHeader = styled.div`
  width: 100%;
  gap: 10px;
  display: flex;
  flex-direction: column;
  /* color: ${({ theme }) => colors[theme].text}; */
  & h1 {
    font-size: 40px;
    font-weight: 600;
  }
  & {
    font-weight: 600;
  }
`;

const ImageDateContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 10px;
  & p {
    font-size: 15px;
  }
`;

const HeaderImage = styled.div`
  display: flex;
  align-items: center;
  /* overflow: hidden; */
  border-radius: 100%;

  align-items: center;
  width: 50px;
  /* height: 100%; */
  & img {
    border-radius: 100%;
    object-fit: cover;
    width: 100%;
    max-width: 50px;
    height: 100%;
    max-height: 50px;
  }
`;

const DataImage = styled.div`
  display: flex;

  width: 100%;
  margin: 20px 0;
  padding: 0 20px;
  & img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const InlinImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 20px 0;
  & img {
    /* max-width: 50%;
    max-height: 50%;
    object-fit: contain; */
  }
`;

const TextContainer = styled.div`
  display: block;
  width: 100%;
  & p {
    font-size: 20px;
    font-weight: 600;
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
        </InlinImage>
      ) : (
        ""
      ),

    code: ({ value }) => (
      <pre data-language={value.language}>
        <code>{value.code}</code>
        <p>{value.filename}</p>
      </pre>
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

const slug = ({ blogData }) => {
  return (
    <SlugContainer>
      <SlugHeader>
        <ImageDateContainer>
          <HeaderImage>
            <Image
              priority
              src={urlForImage(blogData?.author?.image).fit("max").url()}
              width={50}
              height={50}
              alt="author avatar"
            />
          </HeaderImage>
          <p>
            {blogData?.author?.name}, {dateNow(blogData?.date)}
          </p>
        </ImageDateContainer>
        <h1>{blogData?.title}</h1>
        <h2>{blogData?.subtitle}</h2>
      </SlugHeader>
      {blogData.coverImage && (
        <DataImage>
          <Image
            priority
            src={urlForImage(blogData.coverImage)
              .width(sanityImageDimensions(blogData.coverImage).width)
              .height(sanityImageDimensions(blogData.coverImage).height)
              .fit("max")
              .url()}
            width={500}
            height={400}
            alt={blogData?.slug}
          />
        </DataImage>
      )}
      {/* <PortableText value /> */}
      {/* <portableText> */}
      {/* <blogData>
        <PortableText value={blogData?.body} components={serializer} />
      </blogData> */}
      <TextContent blogData={blogData} />
    </SlugContainer>
  );
};

export default slug;

export async function getStaticPaths(context) {
  const paths = await axios
    .get(`${process.env.NEXT_PUBLIC_ENVIRONMENT_URL}/blogs/getAllBlogsSlugs`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return {
    paths: paths?.map((slug) => ({
      params: { slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { slug = "" } = context.params;

  const blogData = await axios
    .post(`${process.env.NEXT_PUBLIC_ENVIRONMENT_URL}/blogs/getBlogBySlug`, {
      slug,
    })
    .then((res) => res.data);

  if (typeof blogData === "undefined" || !blogData) {
    return {
      notFound: true,
      props: {},
    };
  }

  return {
    props: {
      blogData: blogData,
    },
    revalidate: 60,
  };
}
