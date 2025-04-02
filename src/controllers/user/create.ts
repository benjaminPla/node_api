import { Request, Response, RequestHandler } from "express";
import User from "../../models/user";

export const userCreate: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const user = await User.create(req.body);
  res.status(201).send(user);
};
