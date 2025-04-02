import bcrypt from "bcrypt";
import { getEnvVar } from "../../helpers";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import User, { IUser } from "../../models/user";

const authenticate = async (req: Request, res: Response) => {
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

    const token = jwt.sign(
      { email, role: user.role },
      getEnvVar("JWT_SECRET"),
      { expiresIn: parseInt(getEnvVar("JWT_EXPIRES_IN_SECONDS"), 10) },
    );

    res.status(200).send({ token });
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
