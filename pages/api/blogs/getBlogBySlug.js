const sanityClient = require("@sanity/client");
import { sanityConfig } from "configs/sanityConfig";
import { resolve } from "styled-jsx/css";

export default function handler(req, res) {
  return new Promise((resolve, reject) => {
    const client = sanityClient(sanityConfig);
    const { slug } = req.body;
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

    client
      .fetch(query, { slug })
      .then((data) => {
        res.status(200).json(data);
        resolve();
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
        resolve();
      });
  });
}
