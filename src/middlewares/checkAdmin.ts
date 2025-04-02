import { Request, Response, NextFunction } from "express";

const checkAdmin = (req: Request, res: Response, next: NextFunction): any => {
  if (!req.user || req.user.role !== "admin") {
    return res.sendStatus(403);
  }

  next();
};

export default checkAdmin;
