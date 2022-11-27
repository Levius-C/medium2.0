// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { sanityClient } from "../../sanity";
import { Post } from "../../typings";
import { groq } from "next-sanity";

const query = groq`*[_type == "post"]{
    _id,
    _createdAt,
    title,
    author-> {
      name,
      image
    },
    body,
    mainImage,
    slug
  }`;

type Data = {
  posts: Post[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const posts = await sanityClient.fetch(query);
  res.status(200).json({ posts });
}
