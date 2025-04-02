import { getEnvVar, IRequestWithUser } from "../helpers";
import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";

const setToken = (req: IRequestWithUser, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      res.sendStatus(401);
      return;
    }

    const decoded = jwt.verify(token, getEnvVar("JWT_SECRET"));

    req.user = decoded;

    next();
  } catch (error: any) {
    if (error instanceof jwt.JsonWebTokenError) {
      console.error(`invalid token: ${error}`);
      res.sendStatus(401);
      return;
    } else if (error instanceof jwt.TokenExpiredError) {
      console.error(`expired token: ${error}`);
      res.sendStatus(401);
      return;
    } else {
      console.error(`error \`setToken\`: ${error}`);
      res.sendStatus(500);
      return;
    }
  }
};

export default setToken;
