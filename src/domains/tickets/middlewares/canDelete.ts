import { NextFunction, Request, Response } from "express";
import { NO_PERMISSION, NO_ROLE } from "@messages";
import attributes from "@src/domains/attributes";
import { _throwError } from "@src/helper/error";
import { StatusCodes } from "http-status-codes";
import ac from "@src/domains/accesscontrol";
import Role from "@role";

const canDelete = (req: Request, res: Response, next: NextFunction) => {
  try {
    const loggedInUserRole = req.user.role;
    const registerUserRole = req?.body?.role as Role;

    if (!registerUserRole || !Role[registerUserRole] || !loggedInUserRole)
      throw new Error(NO_ROLE);

    const permission = ac.can(Role[loggedInUserRole]).delete(attributes.ticket);

    if (!permission.granted) throw new Error(NO_PERMISSION);
    next();
  } catch (error) {
    _throwError(res, error, StatusCodes.FORBIDDEN);
  }
};

export default canDelete;
