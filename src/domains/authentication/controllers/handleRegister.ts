import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { object, string, mixed } from "yup";

import { RegisterBody } from "../types";
import { _throwError } from "@src/helper/error";

import Role from "@role";
import db from "@db";
import { _handleSuccess } from "@src/helper/success";
import { REGISTER_SUCCESS } from "@messages";
import { StatusCodes } from "http-status-codes";

export async function handleRegister(req: Request, res: Response) {
  try {
    const { body } = req;
    const saltRounds = Number(process.env.SALT_ROUNDS) || 10;

    const newUserShema = object({
      name: string().required(),
      email: string().email().required(),
      password: string().required(),
      role: mixed<Role>().oneOf(Object.values(Role)).required(),
      avatar: string().optional().nonNullable().url(),
    });

    const newUser: RegisterBody = await newUserShema.validate(body, {
      abortEarly: false,
    });

    const salt = bcrypt.genSaltSync(saltRounds);

    const user = await db.user.create({
      data: {
        ...newUser,
        password: bcrypt.hashSync(newUser.password, salt),
        parentId: req.user.id,
      },
    });

    _handleSuccess(res, REGISTER_SUCCESS, user, StatusCodes.CREATED);
  } catch (error) {
    _throwError(res, error, 500);
  }
}
