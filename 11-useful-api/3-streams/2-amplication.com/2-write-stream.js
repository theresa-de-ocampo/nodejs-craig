import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, sep } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Create a writable stream to a file
const writeStream = fs.createWriteStream(
  __dirname + sep + "public" + sep + "favorite-quote.txt"
);

// Writeable stream 'finish' event handler
writeStream.on("finish", () => {
  console.log("Data Writing Complete");
});

writeStream.on("error", (error) => {
  console.error("An unexpected error occurred!");
  console.error(`\t${error}`);
});

writeStream.write("Success ");
writeStream.write("is ");
writeStream.write("what ");
writeStream.write("you ");
writeStream.write("attract ");
writeStream.write("by ");
writeStream.write("the ");
writeStream.write("person ");
writeStream.write("that ");
writeStream.write("you've ");
writeStream.write("become. ");
