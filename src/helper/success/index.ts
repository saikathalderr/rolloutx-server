import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export async function _handleSuccess(
  res: Response,
  message: string,
  data: any,
  statusCode?: number
) {
  return res.status(statusCode || StatusCodes.OK).json({
    message,
    data,
  });
}
