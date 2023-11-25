// Duplex streams are bidirectional
// It offers flexibility in scenarios where reading, and writing can happen concurrently.

import { Duplex } from "stream";

class MyDuplex extends Duplex {
  constructor() {
    super();
    this.data = "";
    this.index = 0;
    this.length = 0;
  }

  _read(size) {
    // Readable Size: Push data to the stream
    const lastIndexToRead = Math.min(this.index + size, this.length);
    this.push(this.data.slice(this.index, lastIndexToRead));
    this.index = lastIndexToRead;
    if (size === 0) {
      // Signal the end of reading
      this.push(null);
    }
  }

  _write(chunk, encoding, next) {
    const data = chunk.toString(); // buffer to string
    console.log(`Writing Chunk: ${data}`);
    this.data += data;
    this.length += data.length;
    next();
  }
}

const duplexStream = new MyDuplex();

// Readable stream 'data' event handler
duplexStream.on("data", (chunk) => {
  console.log(`Received Data: ${chunk}\n`);
});

// Writing data to Duplex stream
duplexStream.write("You ");
duplexStream.write("get ");
duplexStream.write("in ");
duplexStream.write("life ");
duplexStream.write("what ");
duplexStream.write("you ");
duplexStream.write("tolerate.");

// Signal writing ended
duplexStream.end();
