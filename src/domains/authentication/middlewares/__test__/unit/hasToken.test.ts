import hasToken from "@domains/authentication/middlewares/hasToken";
import { Request, Response, NextFunction } from "express";
import { _throwError } from "@src/helper/error";

jest.mock("@src/helper/error");

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

  it("should call next if token is present", () => {
    req.headers = { authorization: "Bearer myToken" };

    hasToken(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
  });

  it("should throw an error if token is not present", () => {
    req.headers = {};

    hasToken(req, res, next);

    expect(next).not.toHaveBeenCalled();
  });
});
