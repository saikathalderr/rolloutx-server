import express, { json } from "express";
import cors from "cors";
import morgan from "morgan";

import routes from "./routes";

const app = express();

// middlewares
app.use(cors());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

// body parser
app.use(json());

// routes
app.use(routes);

export default app;
