import { Buffer } from "buffer";
import { StringDecoder } from "string_decoder";

const bufferData = Buffer.from("Hello World!");
console.log(bufferData.toString("utf-8"));

const decoder = new StringDecoder("utf-8");
console.log(decoder.write(bufferData));
