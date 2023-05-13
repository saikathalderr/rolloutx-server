import server from "./server";

// Server port
const PORT = process.env.PORT || 3000;

// Start server

function startServer() {
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer()