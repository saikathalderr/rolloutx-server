import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";

import hasToken from "@domains/authentication/middlewares/hasToken";
import { _throwError } from "@src/helper/error";

jest.mock("@src/helper/error");
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));

describe("hasAuthToken middleware", () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = {} as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    } as unknown as Response;
    next = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should throw an error if token is not present", () => {
    req.headers = {};

    hasToken(req, res, next);

    expect(next).not.toHaveBeenCalled();
  });

  it("should throw an error if token is invalid", () => {
    req.headers = { authorization: "Bearer myToken" };
    hasToken(req, res, next);

    expect(next).not.toHaveBeenCalled();
  });

  it("should call next if token is present & valid token", () => {
    req.headers = { authorization: "Bearer myToken" };
    const verifyMock = jwt.verify as jest.Mock;
    const user = { id: 1, name: 'John Doe' };

    verifyMock.mockReturnValue(user);

    hasToken(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
  });
});
