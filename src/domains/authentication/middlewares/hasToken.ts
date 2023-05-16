import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import { NO_TOKEN, UNAUTHORIZED_OR_INVALID_TOKEN } from "@messages";
import { _throwError } from "@src/helper/error";
import { User } from "../types";

const hasAuthToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    if (!token) throw Error(NO_TOKEN);

    const decode: User = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string
    ) as User;

    if (!decode) throw Error(UNAUTHORIZED_OR_INVALID_TOKEN);
    req.user = decode;
    next();
  } catch (error) {
    _throwError(res, error, StatusCodes.UNAUTHORIZED);
  }
};

export default hasAuthToken;
