import { Request, Response, NextFunction } from "express";

const checkReq =
  (requiredProps: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const missingProps: string[] = [];

    requiredProps.forEach((prop) => {
      const pathParts = prop.split(".");
      let current: any = req;

      for (const part of pathParts) {
        if (current[part] === undefined || current[part] === null) {
          missingProps.push(prop);
          break;
        }
        current = current[part];
      }
    });

    if (missingProps.length > 0) {
      console.error(
        `error \`checkReq\` missingProps: ${missingProps.toString()}`,
      );
      res.sendStatus(400);
      return;
    }

    next();
  };

export default checkReq;
