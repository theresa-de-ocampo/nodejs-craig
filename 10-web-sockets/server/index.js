import WebSocket, { WebSocketServer } from "ws";
import http from "http";
import crypto from "crypto";

const configuration = {
  serverPort: process.env.server_port || 8000
};

const server = http.createServer();

server.listen(configuration.serverPort, () => {
  console.log(
    `WebSocket server is running on port ${configuration.serverPort}`
  );
});

/**
 * Once the WebSocket server is attached to the HTTP server instance, it will accept the incoming
 * WebSocket connection requests by upgrading the protocol from HTTP to WebSocket.
 */
const wsServer = new WebSocketServer({ server });
const clients = {};

wsServer.on("connection", (connection) => {
  const userId = crypto.randomUUID();
  console.log("Received a new connection.");

  clients[userId] = connection;
  console.log(`${userId} connected.`);
});
