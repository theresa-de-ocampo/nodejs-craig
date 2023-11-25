// https://amplication.com/blog/understanding-nodejs-streams

import fs from "fs";
import { dirname, sep } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url)) + sep;

// Create a readable stream from a file
const readStream = fs.createReadStream(
  __dirname + "public" + sep + "Node.js Novice to Ninja.pdf",
  "utf-8"
);

// Readable stream 'data' event handler
readStream.on("data", (chunk) => {
  console.log(`Received Chunk: ${chunk}\n`);
});

// Readable stream 'end' event handler
readStream.on("end", () => {
  console.log("Data Reading Complete");
});

readStream.on("error", (error) => {
  console.error("An unexpected error occurred!");
  console.error(`\t${error}`);
});
