import { Request, Response, RequestHandler } from "express";

export const userGet: RequestHandler = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  res.sendStatus(200);
};
