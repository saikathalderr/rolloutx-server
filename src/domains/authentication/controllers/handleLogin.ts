import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { object, string } from "yup";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { _throwError } from "@src/helper/error";
import { _handleSuccess } from "@src/helper/success";
import {
  INVALID_PASSWORD,
  LOGIN_SUCCESS,
  USER_NOT_FOUND_IN_DB,
} from "@messages";
import db from "@db";

export async function handleLogin(req: Request, res: Response) {
  try {
    const { body } = req;

    const loginSchema = object({
      email: string().email().required(),
      password: string().required(),
    });

    const loginBody = await loginSchema.validate(body, {
      abortEarly: false,
    });

    const user = await db.user.findUnique({
      where: {
        email: loginBody.email,
      },
    });

    if (!user) throw new Error(USER_NOT_FOUND_IN_DB);

    const isPasswordValid = bcrypt.compareSync(
      loginBody.password,
      user.password
    );

    if (!isPasswordValid) throw new Error(INVALID_PASSWORD);

    const token = jwt.sign(user, process.env.JWT_SECRET as string, {
      expiresIn: "7d",
    });

    _handleSuccess(res, LOGIN_SUCCESS, {
      token,
      user,
    });
  } catch (error) {
    _throwError(res, error, StatusCodes.UNAUTHORIZED);
  }
}
