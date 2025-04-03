import { Request, Response } from "express";
import User from "../../models/user";

const userGet = async (_req: Request, res: Response): Promise<any> => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    if (!users.length) {
      return res.sendStatus(404);
    }

    return res.status(200).send(users);
  } catch (error: any) {
    console.error(`error \`userCreate\`: ${error} `);
    return res.sendStatus(500);
  }
};

export default userGet;
