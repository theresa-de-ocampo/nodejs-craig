import { Readable } from "stream";

const readableStream = new Readable();

readableStream.on("data", (chunk) => {
  console.log(`Received Chunk: ${chunk}`);
});

readableStream.on("end", () => {
  console.log("Data Reading Complete");
});

readableStream.on("error", (error) => {
  console.error("An unexpected error occurred!");
  console.error(`\t${error}`);
});

readableStream.push("This is a `new Readable()` example.");
readableStream.push("Node.js streams are powerful!");
readableStream.push(null);
