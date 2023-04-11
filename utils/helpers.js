import createImageUrlBuilder from "@sanity/image-url";
import { sanityConfig } from "configs/sanityConfig";

export const imageBuilder = createImageUrlBuilder(sanityConfig);

export const urlForImage = (source) => {
  return imageBuilder.image(source).auto("format").fit("max");
};

export const sanityImageDimensions = (source = "") => {
  const dimensionsArray = imageBuilder
    .image(source)
    .toString()
    .split("-")[1]
    .replace(/\.jpg|\.png|\.svg/, "")
    .split("x");

  return {
    width: dimensionsArray[0],
    height: dimensionsArray[1],
  };
};

export const dateNow = (_createdAt) => {
  let convertDate = new Date(_createdAt);
  const { day, month, year } = new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
    .formatToParts(convertDate)
    .reduce((b, a) => {
      b[a.type] = a.value;
      return b;
    }, {});
  return `${month} ${day} ${year}`;
};

export const clamp = (value, min, max, clampMin, clampMax) => {
  const range = max - min;
  const clampRange = clampMax - clampMin;
  const clampValue = ((value - min) * clampRange) / range + clampMin;
  return Math.max(Math.min(clampValue, clampMax), clampMin);
};

export const clampValue = (value, min, max, clampMin, clampMax) => {
  const range = max - min;
  const clampedRange = clampMax - clampMin;
  const clampedValue = ((value - min) * clampedRange) / range + clampMin;
  return Math.max(Math.min(clampedValue, clampMax), clampMin);
};

// export const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
