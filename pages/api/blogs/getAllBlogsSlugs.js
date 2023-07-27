const sanityClient = require("@sanity/client");
import { sanityConfig } from "configs/sanityConfig";
import { resolve } from "styled-jsx/css";

export default function handler(req, res) {
  return new Promise((resolve, reject) => {
    const client = sanityClient(sanityConfig);

    const query = `*[_type == "blog" && defined(slug.current)][].slug.current `;

    client
      .fetch(query)
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
