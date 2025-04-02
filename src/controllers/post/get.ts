import { Request, Response } from "express";
import Post from "../../models/post";

const postGet = async (_req: Request, res: Response): Promise<any> => {
  try {
    const posts = await Post.findAll();

    return res.status(200).send(posts);
  } catch (error: any) {
    console.error(`error \`postGet\`: ${error} `);
    return res.sendStatus(500);
  }
};

export default postGet;
