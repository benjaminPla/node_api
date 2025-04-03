import { getEnvVar, getRedisClient } from "../../helpers";
import Post from "../../models/post";
import { Request, Response } from "express";

const postGet = async (_req: Request, res: Response): Promise<any> => {
  try {
    const redis = await getRedisClient();
    const cachedPosts = await redis.get("posts");
    if (cachedPosts) {
      return res.status(200).send(JSON.parse(cachedPosts));
    }

    const posts = await Post.findAll({ raw: true });
    if (!posts.length) {
      return res.sendStatus(404);
    }

    await redis.set("posts", JSON.stringify(posts), {
      EX: parseInt(getEnvVar("REDIS_EX_S"), 10),
    });

    return res.status(200).send(posts);
  } catch (error: any) {
    console.error(`error \`postGet\`: ${error} `);
    return res.sendStatus(500);
  }
};

export default postGet;
