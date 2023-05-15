import { Router } from "express";
import authenticationRouter from "@domains/authentication";

const router = Router();

router.use("/authentication", authenticationRouter);

export default router;
