import { NextFunction, Response } from "express";
import ac from "@src/domains/accesscontrol";
import Role from "@role";
import { _throwError } from "@src/helper/error";
import { StatusCodes } from "http-status-codes";
import { NO_PERMISSION } from "@messages";

const canRegister = (req: any, res: Response, next: NextFunction) => {
  try {
    // const { role } = req?.user;
    const bodyRol = req?.body?.role as Role;
    if (!bodyRol) throw new Error(NO_PERMISSION);

    const permission = ac.can(Role[bodyRol]).create(Role.DEVELOPER);
    console.log(bodyRol, permission.granted);

    if (!permission.granted) throw new Error(NO_PERMISSION);
    next();
  } catch (error) {
    _throwError(res, error, StatusCodes.FORBIDDEN);
  }
};

export default canRegister;
