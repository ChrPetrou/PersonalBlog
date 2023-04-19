const sanityClient = require("@sanity/client");
import blogsService from "backend/services/blog.service";
import { sanityConfig } from "configs/sanityConfig";

export default function handler(req, res) {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await blogsService.getAllBlogs(req.body);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
    resolve();
  });
}
