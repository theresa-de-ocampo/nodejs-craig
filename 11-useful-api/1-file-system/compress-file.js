import { getFileInfo } from "./lib/get-file-info.js";
import path from "path";
import { fileURLToPath } from "url";
import { readFile, writeFile } from "fs/promises";

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

let content;
try {
  content = await readFile(inputFilePath, { encoding: "utf-8" });
  console.log(`Original File Size: ${content.length}`);
} catch (error) {
  console.log(error);
  process.exit(1);
}

try {
  // Compress Content
  content = content
    .replace(/\n\s+/g, "\n") // trim leading space from lines
    .replace(/\/\/.*?$|\/\*[\s\S]*?\*\//gm, "") // remove inline // comments
    .replace(/\s+/g, " ") // remove whitespace
    .replace(/\/\*.*?\*\//g, "") // remove /* comments */
    .replace(/<!--.*?-->/g, "") // remove <!-- comments -->
    .replace(/\s*([<>(){}}[\]])\s*/g, "$1") // remove space around brackets
    .trim();

  console.log(`Compressing file at ${outputFilePath}`);
  await writeFile(outputFilePath, content);
  console.log(`Compressed File Size: ${content.length}`);
} catch (error) {
  console.log(error);
  process.exit();
}
