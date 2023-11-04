import { Transform } from "stream";

export default class Compress extends Transform {
  constructor(options) {
    super(options);
    this.chunks = 0;
    this.originalLength = 0;
    this.newLength = 0;
  }

  _transform(chunk, encoding, callback) {
    const data = chunk.toString(); // buffer to string
    const compressedData = data
      .replace(/\n\s+/g, "\n") // trim leading space from lines
      .replace(/\/\/.*?$|\/\*[\s\S]*?\*\//gm, "") // remove inline // comments
      .replace(/\s+/g, " ") // remove whitespace
      .replace(/\/\*.*?\*\//g, "") // remove /* comments */
      .replace(/<!--.*?-->/g, "") // remove <!-- comments -->
      .replace(/\s*([<>(){}}[\]])\s*/g, "$1") // remove space around brackets
      .trim();

    this.chunks++;
    this.originalLength += data.length;
    this.newLength += compressedData.length;

    this.push(compressedData);
    callback();
  }
}
