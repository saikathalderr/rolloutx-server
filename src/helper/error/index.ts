import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export async function _throwError(
  res: Response,
  error: any,
  statusCode: number
) {
  const code = statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = (error as Error).message || "Internal server error";
  const errors = error?.errors;
  return res.status(code).json({
    message,
    errors,
  });
}
