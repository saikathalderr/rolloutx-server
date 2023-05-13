import express, { json } from "express";
import cors from "cors";
import routes from "./routes";

const app = express();

// cors
app.use(cors());

// body parser
app.use(json());

// routes
app.use(routes);

export default app;
