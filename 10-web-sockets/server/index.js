import WebSocket, { WebSocketServer } from "ws";
import http from "http";
import crypto from "crypto";
import { EVENTS } from "./utils/index.js";

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

// * States
const clients = {}; // all active connections
const users = {}; // all active users
let editorContent = null; // current editor content
let userActivity = []; // user activity history

wsServer.on("connection", (connection) => {
  const userId = crypto.randomUUID();
  console.log("Received a new connection.");

  clients[userId] = connection;
  console.log(`${userId} connected.`);

  connection.on("message", (message) => handleMessage(message, userId));
  connection.on("message", () => handleDisconnect(userId));
});

function broadcastMessage(json) {
  const data = JSON.stringify(json);
  for (let userId in clients) {
    let client = clients[userId];
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  }
}

function handleMessage(bufferMeesage, userId) {
  const dataFromClient = JSON.parse(bufferMeesage.toString());
  const json = { type: dataFromClient.type };
  if (dataFromClient.type === EVENTS.USER) {
    users[userId] = dataFromClient;
    userActivity.push(`${dataFromClient.username} joined to edit the document`);
    json.data = { users, userActivity };
  } else if (dataFromClient.type === EVENTS.DOCUMENT) {
    editorContent = dataFromClient.content;
    json.data = { editorContent, userActivity };
  }
}

function handleDisconnect(userId) {
  /**
   * From react-use-webhook documentation
   * Multiple components can optionally use a single WebSocket, which is closed and cleaned up when
   * all subscribed components have unsubscribed/unmounted
   */
  console.log(`${userId} disconnected.`);
  const json = { type: EVENTS.USER };
  const username = users[userId]?.username || userId;

  delete clients[userId];
  delete users[userId];

  userActivity.push(`${username} left the document`);
  json.data = { users, userActivity };
  broadcastMessage(json);
}
