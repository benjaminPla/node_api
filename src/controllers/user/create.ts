import { Request, Response, RequestHandler } from "express";

export const userCreate: RequestHandler = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  res.sendStatus(201);
};
