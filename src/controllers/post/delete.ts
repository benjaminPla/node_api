import { getRedisClient } from "../../helpers";
import Post from "../../models/post";
import { Request, Response } from "express";

const postDelete = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    const post = await Post.findByPk(id);
    if (!post) {
      return res.sendStatus(404);
    }

    if (post.user_id !== req.user?.id) {
      return res.sendStatus(403);
    }

    await post.destroy();

    const redis = await getRedisClient();
    await redis.del("posts");

    return res.sendStatus(204);
  } catch (error) {
    console.error(`error \`postDelete\`: ${error}`);
    return res.sendStatus(500);
  }
};

export default postDelete;
