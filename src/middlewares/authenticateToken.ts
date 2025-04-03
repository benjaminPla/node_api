import { getEnvVar } from "../helpers";
import jwt from "jsonwebtoken";
import { NextFunction, Response, Request } from "express";
import { JwtPayload } from "../extended";

const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.sendStatus(401);
    }

    const decoded = jwt.verify(token, getEnvVar("JWT_SECRET"));

    req.user = decoded as JwtPayload;

    next();
  } catch (error: any) {
    if (error instanceof jwt.JsonWebTokenError) {
      console.error(`error \`authenticateToken\` invalid token: ${error}`);
      return res.sendStatus(401);
    } else if (error instanceof jwt.TokenExpiredError) {
      console.error(`error \`authenticateToken\` expired token: ${error}`);
      return res.sendStatus(401);
    } else {
      console.error(`error \`authenticateToken\`: ${error}`);
      return res.sendStatus(500);
    }
  }
};

export default authenticateToken;
