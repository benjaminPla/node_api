import bcrypt from "bcrypt";
import { getEnvVar } from "../../helpers";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import User, { IUser } from "../../models/user";

const authenticate = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user: IUser | null = await User.findOne({
      where: { email },
    });
    if (!user) {
      return res.sendStatus(404);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.sendStatus(401);
    }

    const token = jwt.sign(
      { email, role: user.role },
      getEnvVar("JWT_SECRET"),
      { expiresIn: parseInt(getEnvVar("JWT_EXPIRES_MS"), 10) },
    );

    return res.status(200).send({ token });
  } catch (error: any) {
    console.error(`error \`userCreate\`: ${error} `);
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.sendStatus(409);
    }
    return res.sendStatus(500);
  }
};

export default authenticate;
