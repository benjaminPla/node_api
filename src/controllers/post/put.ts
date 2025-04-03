import Post from "../../models/post";
import { Request, Response } from "express";
import { getRedisClient } from "../../helpers";

const postPut = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params!;
    const { content } = req.body;

    const post = await Post.findByPk(id);
    if (!post) {
      return res.sendStatus(404);
    }
    if (post.user_id !== req.user!.id) {
      return res.sendStatus(403);
    }

    await post.update({ content });

    const redis = await getRedisClient();
    redis.del("posts");

    return res.sendStatus(204);
  } catch (error: any) {
    console.error(`error \`postPost\`: ${error} `);
    return res.sendStatus(500);
  }
};

export default postPut;
