import { Router } from "express";
import { handleLogin } from "./controllers/handleLogin";
import { handleRegister } from "./controllers/handleRegister";
import canRegister from "./middlewares/canRegister";
import hasAuthToken from "./middlewares/hasToken";

const authenticationRouter = Router();

authenticationRouter.post("/login", handleLogin);
authenticationRouter.post(
  "/register",
  hasAuthToken,
  canRegister,
  handleRegister
);

export default authenticationRouter;
