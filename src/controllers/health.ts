import { Request, Response } from "express";

const health = (_req: Request, res: Response): any => {
  return res.sendStatus(200);
};

export default health;
