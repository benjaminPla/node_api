import bcrypt from "bcrypt";
import { getEnvVar } from "../../helpers";
import { Request, Response } from "express";
import User from "../../models/user";

const userPost = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(getEnvVar("BCRYPT_SALT"), 10),
    );

    const user = await User.create({ email, password: hashedPassword });

    return res.status(201).send(user);
  } catch (error: any) {
    console.error(`error \`userCreate\`: ${error} `);
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.sendStatus(409);
    }
    return res.sendStatus(500);
  }
};

export default userPost;
