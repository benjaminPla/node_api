import { Request, Response } from "express";
import User from "../../models/user";

const userGet = async (_req: Request, res: Response) => {
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
