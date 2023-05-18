import { Router } from "express";
import authenticationRouter from "@domains/authentication";
import ticketRouter from "@domains/tickets/route";

const router = Router();

router.use("/authentication", authenticationRouter);
router.use("/tickets", ticketRouter);

export default router;
