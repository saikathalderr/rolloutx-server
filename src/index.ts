import "dotenv/config";
import "module-alias/register";

import { StatusCodes } from "http-status-codes";
import expressServer from "@src/server";
import { Server } from "http";

// Server port
const PORT = process.env.PORT || 3000;

// Health check endpoint
expressServer.get("/", (req, res) => {
  res.status(StatusCodes.OK).send("OK");
});

// Start server
function startServer(): Server {
  // Listen on port
  return expressServer.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
