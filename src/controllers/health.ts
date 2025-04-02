import { Request, Response } from "express";

const health = (_req: Request, res: Response) => {
  res.sendStatus(200);
};

export default health;
