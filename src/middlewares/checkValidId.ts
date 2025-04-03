import { Request, Response, NextFunction } from "express";
import { validate } from "uuid";

const checkValidId = (req: Request, res: Response, next: NextFunction): any => {
  if (!validate(req.params.id)) {
    console.error("error `checkValidId`: unvalid id");
    return res.sendStatus(400);
  }

  next();
};

export default checkValidId;
