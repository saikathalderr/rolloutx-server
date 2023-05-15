import { Router } from "express";
import { handleLogin } from "./controllers/handleLogin";
import { handleRegister } from "./controllers/handleRegister";
import canRegister from "./middlewares/canRegister";

const authenticationRouter = Router();

authenticationRouter.post("/login", handleLogin);
authenticationRouter.post("/register", canRegister, handleRegister);

export default authenticationRouter;
