export const sanityConfig = {
  dataset: process.env.NEXT_BLOG_SANITY_DATASET,
  projectId: process.env.NEXT_BLOG_SANITY_PROJECT_ID,
  useCdn: true,
  //usedCdn ==== true ,give you fast response, it will get you cached data
  //usedCdn ==== false ,give you slower response, it will get you latest data
  apiVersion: "v2021-10-21",
};
