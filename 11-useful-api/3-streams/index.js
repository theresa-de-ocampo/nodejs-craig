import path from "path";
import { createReadStream, createWriteStream } from "fs";
import { fileURLToPath } from "url";

// * Libraries
import { getFileInfo } from "./lib/get-file-info.js";
import Compress from "./lib/compress.js";

const __filename = fileURLToPath(import.meta.url);

const inputFilePath = path.resolve(process.argv[2]);
let outputFilePath = path.resolve(process.argv[3]);

const [inputFileInfo, outputFileInfo] = await Promise.all([
  getFileInfo(inputFilePath),
  getFileInfo(outputFilePath)
]);

// Use input file name prefixed with "c-" when output is a directory
if (outputFileInfo.isDir && outputFileInfo.canWrite && inputFileInfo.isFile) {
  outputFilePath = path.resolve(
    outputFilePath,
    `c-${path.basename(inputFilePath)}`
  );
}

// Check for errors
const errors = [];
if (!inputFileInfo.isFile || !inputFileInfo.canRead) {
  errors.push(`Cannot read input file: ${inputFilePath}`);
}

if (inputFilePath === outputFilePath) {
  errors.push("Input and output files cannot be the same");
}

if (errors.length > 0) {
  console.log(
    `Usage: ${path.basename(__filename)} [input: file] [output: file|dir]`
  );
  console.error(`\n ${errors.join("\n")}`);
  process.exit(1);
}

const compress = new Compress();
const readStream = createReadStream(inputFilePath);
const writeStream = createWriteStream(outputFilePath);

readStream
  .pipe(compress)
  .pipe(writeStream)
  .on("finish", () => {
    console.log(`File Size: ${compress.originalLength}`);
    console.log(`Compressing File Location: ${outputFilePath}`);
    console.log(`Chunks: ${compress.chunks}`);
    console.log(
      `Compressed File Size: ${compress.newLength} (-${Math.round(
        ((compress.originalLength - compress.newLength) /
          compress.originalLength) *
          100
      )})%`
    );
  });
