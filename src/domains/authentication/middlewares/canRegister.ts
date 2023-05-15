import { NextFunction, Request, Response } from "express";
import ac from "@src/domains/accesscontrol";
import Role from "@role";
import { _throwError } from "@src/helper/error";
import { StatusCodes } from "http-status-codes";

const noPermissionMessage = "You don't have enough permission to perform this";

const canRegister = (req: any, res: Response, next: NextFunction) => {
  try {
    // const { role } = req?.user;
    const bodyRol = req?.body?.role as Role;
    if (!bodyRol) throw new Error(noPermissionMessage);

    const permission = ac.can(Role[bodyRol]).create(Role.DEVELOPER);
    console.log(bodyRol, permission.granted);

    if (!permission.granted) throw new Error(noPermissionMessage);
    next();
  } catch (error) {
    _throwError(res, error, StatusCodes.FORBIDDEN);
  }
};

export default canRegister;
