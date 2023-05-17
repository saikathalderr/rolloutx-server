import { NextFunction, Request, Response } from "express";
import ac from "@src/domains/accesscontrol";
import { _throwError } from "@src/helper/error";
import { StatusCodes } from "http-status-codes";
import { NO_PERMISSION, NO_ROLE } from "@messages";
import Role from "@role";

const canRegister = (req: Request, res: Response, next: NextFunction) => {
  try {
    const loggedInUserRole = req.user.role;
    const registerUserRole = req?.body?.role as Role;
    console.log(loggedInUserRole,
      registerUserRole);

    if (!registerUserRole || !Role[registerUserRole] || !loggedInUserRole)
      throw new Error(NO_ROLE);

    const permission = ac
      .can(Role[loggedInUserRole])
      .create(Role[registerUserRole]);

    if (!permission.granted) throw new Error(NO_PERMISSION);
    next();
  } catch (error) {
    _throwError(res, error, StatusCodes.FORBIDDEN);
  }
};

export default canRegister;
