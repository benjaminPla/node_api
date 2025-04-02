import { Request, Response, RequestHandler } from "express";
import User from "../../models/user";

export const userGet: RequestHandler = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  const users = await User.findAll();
  res.status(200).send(users);
};
