import { StatusCodes } from "http-status-codes";
import { _handleSuccess } from "@src/helper/success";
import { _throwError } from "@src/helper/error";
import { mixed, object, string } from "yup";
import { Request, Response } from "express";
import { TICKET_CREATED } from "@messages";
import { TicketStatus } from "../types";
import db from "@db";

export async function handleTicketCreate(req: Request, res: Response) {
  try {
    const { body } = req;
    const newTicketSchema = object({
      title: string().required(),
      content: string().required(),
      status: mixed<TicketStatus>()
        .oneOf(Object.values(TicketStatus))
        .required(),
    });
    const newTicket = await newTicketSchema.validate(body, {
      abortEarly: false,
    });

    const ticket = await db.ticket.create({
      data: {
        ...newTicket,
        authorId: req.user.id,
      },
    });

    _handleSuccess(res, TICKET_CREATED, ticket, StatusCodes.CREATED);
  } catch (error) {
    console.log(error);
    _throwError(res, error, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
