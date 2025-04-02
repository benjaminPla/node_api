import bcrypt from "bcrypt";
import { getEnvVar } from "../../helpers";
import jwt from "jsonwebtoken";
import { Request, Response, RequestHandler } from "express";
import User, { IUser } from "../../models/user";

const authenticate: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    if (!req.body) {
      res.sendStatus(400);
      return;
    }
    const { email, password } = req.body;
    if (!email || !password) {
      res.sendStatus(400);
      return;
    }

    const user: IUser | null = await User.findOne({
      where: { email },
    });
    if (!user) {
      res.sendStatus(404);
      return;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.sendStatus(401);
      return;
    }

    const token = jwt.sign({ email, role: user.role }, getEnvVar("JWT_SECRET"));

    res.status(200).send(token);
  } catch (error: any) {
    console.error(`error \`userCreate\`: ${error} `);
    if (error.name === "SequelizeUniqueConstraintError") {
      res.sendStatus(409);
      return;
    }
    res.sendStatus(500);
  }
};

export default authenticate;
