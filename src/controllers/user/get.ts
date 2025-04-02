import { Request, Response, RequestHandler } from "express";
import User from "../../models/user";

const userGet: RequestHandler = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });

    res.status(200).send(users);
  } catch (error: any) {
    console.error(`error \`userCreate\`: ${error} `);
    res.sendStatus(500);
  }
};

export default userGet;
