const sanityClient = require("@sanity/client");
import { sanityConfig } from "configs/sanityConfig";
import { resolve } from "styled-jsx/css";

export default function handler(req, res) {
  return new Promise((resolve, reject) => {
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

    client
      .fetch(query)
      .then((data) => {
        //Caluclate number of pages
        const numberOfPages = Math.ceil(data.length / 6);
        //create an array of page numbers
        const pageNumbersArray = Array.from(
          { length: numberOfPages },
          (e, i) => i + 1
        );
        res.status(200).json(pageNumbersArray);
        resolve();
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
        resolve();
      });
  });
}
