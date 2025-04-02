import { Request, Response, RequestHandler } from "express";

export const health: RequestHandler = (_req: Request, res: Response): void => {
  res.sendStatus(200);
};
