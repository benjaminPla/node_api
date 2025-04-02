import { getEnvVar } from "../helpers";
import jwt from "jsonwebtoken";
import { NextFunction, Response, Request } from "express";
import { JwtPayload } from "../extended";

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      res.sendStatus(401);
      return;
    }

    const decoded = jwt.verify(token, getEnvVar("JWT_SECRET"));

    req.user = decoded as JwtPayload;

    next();
  } catch (error: any) {
    if (error instanceof jwt.JsonWebTokenError) {
      console.error(`error \`authenticateToken\` invalid token: ${error}`);
      res.sendStatus(401);
      return;
    } else if (error instanceof jwt.TokenExpiredError) {
      console.error(`error \`authenticateToken\` expired token: ${error}`);
      res.sendStatus(401);
      return;
    } else {
      console.error(`error \`authenticateToken\`: ${error}`);
      res.sendStatus(500);
      return;
    }
  }
};

export default authenticateToken;
