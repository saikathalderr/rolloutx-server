import "dotenv/config";
import "module-alias/register";

import { StatusCodes } from "http-status-codes";
import { Server } from "http";
import { Response } from "express";

import expressServer from "@src/server";
import routes from "@src/routes";

// Server port
const PORT = process.env.PORT || 3000;

// Health check endpoint
expressServer.get("/", (_, res: Response) => {
  res.status(StatusCodes.OK).send("OK");
});

// API endpoints
expressServer.use("/api/v1", routes);

// Start server
function startServer(): Server {
  // Listen on port
  return expressServer.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
