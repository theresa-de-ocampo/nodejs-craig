import fs from "fs";
import zlib from "zlib";
import { dirname, sep } from "path";
import { fileURLToPath } from "url";
import { Transform } from "stream";

const __dirname = dirname(fileURLToPath(import.meta.url)) + sep;

const configuration = {
  dir: {
    root: __dirname,
    public: __dirname + "public" + sep
  }
};

// Create a readable stream from a file
const readableStream = fs.createReadStream(
  configuration.dir.public + "rabbit-and-turtle.txt"
);

const transformStream = new Transform({
  transform(chunk, encoding, callback) {
    const modifiedData = chunk.toString().toUpperCase();
    this.push(modifiedData);
    callback;
  }
});

const compressStream = zlib.createGzip();

const writeableStream = fs.createWriteStream(
  configuration.dir.public + "compressed-tale.gz"
);

/**
 * Streamlined Data Flow
 * We read a file using a readable stream, transform the data to uppercase and compress it using
 * two transform streams (one is ours, one is the built-in zlib transform stream), and finally
 * write the data to a file using a writeable stream.
 */
readableStream.pipe(transformStream).pipe(compressStream).pipe(writeableStream);

writeableStream.on("finish", () => {
  console.log("Compression Complete");
});

writeableStream.on("error", (error) => {
  console.log("An error occurred during compression");
  console.log(`\t${error}`);
});

/**
 * Implement Flow Control Mechanisms
 * When a writeable stream cannot keep up with the rate of data being read from a readable stream,
 * by the time the readable stream finish reading, there can be a lot of data left in the buffer.
 * In some scenarios, this might even exceed the amount of available memory. This is called
 * BACKPRESSURE. To hanlde backpressure effectively, consider implementing flow control mechanisms,
 * such as pause() and resume() methods or leveraging third-party modules like pump or through2.
 */
