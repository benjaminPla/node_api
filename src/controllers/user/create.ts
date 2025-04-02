import bcrypt from "bcrypt";
import { getEnvVar } from "../../helpers";
import { Request, Response } from "express";
import User from "../../models/user";

const userCreate = async (req: Request, res: Response) => {
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

    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(getEnvVar("BCRYPT_SALT"), 10),
    );

    const user = await User.create({ email, password: hashedPassword });

    res.status(201).send(user);
  } catch (error: any) {
    console.error(`error \`userCreate\`: ${error} `);
    if (error.name === "SequelizeUniqueConstraintError") {
      res.sendStatus(409);
      return;
    }
    res.sendStatus(500);
  }
};

export default userCreate;
