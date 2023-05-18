import { Router } from "express";
import { handleTicketCreate } from "./controllers/handleTicketCreate";
import hasAuthToken from "@src/domains/authentication/middlewares/hasToken";

const ticketRouter = Router();

ticketRouter.post("/create", hasAuthToken, handleTicketCreate);

export default ticketRouter;
