/**
 * Transform stream are a special type of duplex stream that modify or transform the data while
 * it passes through the stream. They are commonly used for data manipulation tasks, such as
 * compression, encryption, or parsing. Transform streams receive input, process it, and emit
 * modified output.
 */
import { Transform } from "stream";

// Create a Transform stream
const uppercaseTransformStream = new Transform({
  transform(chunk, encoding, callback) {
    // Transform the received data
    const transformedData = chunk.toString().toUpperCase();

    // Push the transformed data to the stream
    this.push(transformedData);

    // Signal the completion of processing the chunk
    callback();
  }
});

// Readable stream 'data' event handler
uppercaseTransformStream.on("data", (chunk) => {
  console.log(`Received Chunk: ${chunk}`);
});

// Write a quote to a stream
uppercaseTransformStream.write("It is important to rebuild trust in yourself ");
uppercaseTransformStream.write(
  "because you have to live with the consequences of your decisions. "
);
uppercaseTransformStream.write(
  "While seeking the perspective and advice of others can be helpful, "
);
uppercaseTransformStream.write("others do not live with the consequences, ");
uppercaseTransformStream.write(
  "and therefore are not qualified to make your life decisions."
);
