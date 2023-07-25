import sanityClient from "@sanity/client";
import { sanityConfig } from "configs/sanityConfig";

const blogsService = {
  getAllBlogs: async ({ blogLimitStart, blogLimiteEnd }) => {
    const client = sanityClient(sanityConfig);
    const query = `*[_type == "blog"] | order(date)[$blogLimitStart...$blogLimiteEnd]{
        "createAt":_createdAt,
          "slug":slug.current,
          "title":title,
          "author":{
            "image":author->avatar.asset._ref,
            "name":author->name,
          },
          "body": content[]{
            ...,
             markDefs[]{
            ...,
            _type == "internalLink" => {
              "slug": @.reference->slug
            }
          }
          }, 
          date,
          coverImage,
        "subtitle":subtitle
      }`;

    return client
      .fetch(query, { blogLimitStart, blogLimiteEnd })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  },
  getBlogBySlug: async () => {
    const client = sanityClient(sanityConfig);
    const query = `*[_type == "blog" && slug.current == $slug][0]{
        "createAt":_createdAt,
          "slug":slug.current,
          "title":title,
          "author":{
            "image":author->avatar.asset._ref,
            "name":author->name,
          },
          "body": content[]{
            ...,
             markDefs[]{
            ...,
            _type == "internalLink" => {
              "slug": @.reference->slug
            }
          }
          }, 
          date,
          coverImage,
        "subtitle":subtitle
      }`;
    return client.fetch(query, { slug }).catch((err) => {
      throw err;
    });
  },

  getAllBlogsSlugs: async (slug) => {
    const client = sanityClient(sanityConfig);
    const query = `*[_type == "blog" && defined(slug.current)].slug.current `;
    return client.fetch(query).catch((err) => {
      throw err;
    });
  },
  getBlogCount: async () => {
    const client = sanityClient(sanityConfig);
    const query = `*[_type == "blog"] | order(date){
        "createAt":_createdAt,
          "slug":slug.current,
          "title":title,
          "author":{
            "image":author->avatar.asset._ref,
            "name":author->name,
          },
          "body": content[]{
            ...,
             markDefs[]{
            ...,
            _type == "internalLink" => {
              "slug": @.reference->slug
            }
          }
          }, 
          date,
          coverImage,
        "subtitle":subtitle
      }`;

    return client
      .fetch(query)
      .then((data) => {
        //Caluclate number of pages
        const numberOfPages = Math.ceil(data.length / 3);
        //create an array of page numbers
        const pageNumbersArray = Array.from(
          { length: numberOfPages },
          (e, i) => i + 1
        );
        return pageNumbersArray;
      })
      .catch((err) => {
        throw err;
      });
  },
};

export default blogsService;
