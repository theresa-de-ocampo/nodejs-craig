import WebSocket from "ws";
import crypto from "crypto";

const wss = new WebSocket.Server({ port: 8000 });

// Create a map to store a client's metadata. Any data we wish to associate with a WebSocket client.
const clients = new Map();

// Whenever a new WebSocket client connects to the server, there will be an event emitted called
// connection
wss.on("connection", (ws) => {
  const id = crypto.randomUUID();
  const color = Math.floor(Math.random() * 360);
  const metadata = { id, color };
  clients.set(ws, metadata);

  // We subscribe to that instance's message event
  // This event is on the WebSocket connection instance itself,
  // and not on the WebSockerServer instance.
  ws.on("message", (inbound) => {
    const message = JSON.parse(inbound);
    const metadata = clients.get(ws);
    message.sender = metadata.id;
    message.color = metadata.color;

    // We then stringify our message again, and send it out to every connected client,
    // so that every client can receive the message from the sending client.
    const outbound = JSON.stringify(message);
    [...clients.keys()].forEach((client) => client.send(outbound));
  });
});
