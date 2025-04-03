import { getRedisClient } from "../../helpers";
import Post from "../../models/post";
import { Request, Response } from "express";

const postPost = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id: user_id } = req.user!;
    const { content } = req.body;

    await Post.create({ content, user_id });

    const redis = await getRedisClient();
    redis.del("posts");

    return res.sendStatus(201);
  } catch (error: any) {
    console.error(`error \`postPost\`: ${error} `);
    return res.sendStatus(500);
  }
};

export default postPost;
