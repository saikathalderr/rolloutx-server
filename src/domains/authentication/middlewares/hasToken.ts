import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import { UNAUTHORIZED_OR_INVALID_TOKEN } from "@messages";
import { _throwError } from "@src/helper/error";

const hasAuthToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    _throwError(res, UNAUTHORIZED_OR_INVALID_TOKEN, StatusCodes.UNAUTHORIZED);
  } else {
    next();
  }
};

export default hasAuthToken;
