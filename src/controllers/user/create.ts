import bcrypt from "bcrypt";
import { getEnvVar } from "../../helpers";
import { Request, Response, RequestHandler } from "express";
import User from "../../models/user";

const userCreate: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { email, password } = req.body;

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
