import { NextFunction, Request, Response } from "express";
import canRegister from "@domains/authentication/middlewares/canRegister";
import Role from "@src/domains/authentication/role";
import { User } from "@src/domains/authentication/types";
import { NO_PERMISSION, NO_ROLE } from "@src/constants/messages/const.messages";

describe("canRegister middleware", () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = {} as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn().mockReturnThis(),
    } as unknown as Response;
    next = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should throw error if no role found in request body", async () => {
    req.body = {};
    canRegister(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      errors: undefined,
      message: "Cannot read property 'role' of undefined",
    });
  });

  it("should throw error if no role found in request user", async () => {
    req.body = { role: Role.ADMIN };
    canRegister(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      errors: undefined,
      message: "Cannot read property 'role' of undefined",
    });
  });

  it("should throw error if role is invalid", async () => {
    req.body = { role: "INVALID_ROLE" };
    req.user = { role: Role.ADMIN } as User;
    canRegister(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      errors: undefined,
      message: NO_ROLE,
    });
  });

  it("should throw error if permission is not granted", async () => {
    req.body = { role: Role.ADMIN };
    req.user = { role: Role.DEVELOPER } as User;

    canRegister(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      errors: undefined,
      message: NO_PERMISSION,
    });
  });

  it("should call next if permission is granted", async () => {
    req.body = { role: Role.DEVELOPER };
    req.user = { role: Role.ADMIN } as User;

    canRegister(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
  });
});
