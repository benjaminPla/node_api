import { Request, Response, RequestHandler } from "express";

const health: RequestHandler = (_req: Request, res: Response): void => {
  res.sendStatus(200);
};

export default health;
