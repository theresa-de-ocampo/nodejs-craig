// Other Resources: https://www.digitalocean.com/community/tutorials/how-to-use-multithreading-in-node-js

import chalk from "chalk";
import { Worker } from "worker_threads";
import { dirname, sep } from "path";
import { fileURLToPath } from "url";

// * Libraries
import diceRoller from "./lib/dice-roller.js";

const timer = setInterval(() => {
  console.log(" another process");
}, 1000);

const runs = 100_000_000;
const numberOfDice = 2;

console.log(chalk.magenta("NON-THREADED CALCULATION STARTED"));
performance.mark("non-threaded:start");
const noWorkerStats = diceRoller(runs, numberOfDice);
performance.mark("non-threaded:end");
console.table(noWorkerStats);
console.log(chalk.magenta("NON-THREADED CALCULATION COMPLETE"));

console.log(chalk.cyan("WORKER THREAD CALCULATION STARTED"));
performance.mark("threaded:start");
const worker = new Worker(
  dirname(fileURLToPath(import.meta.url)) + sep + "worker.js",
  {
    workerData: { runs, numberOfDice }
  }
);

worker.on("message", (result) => {
  console.table(result);
});

worker.on("error", (error) => {
  console.log(error);
});

worker.on("exit", (code) => {
  performance.mark("threaded:end");
  console.log(`Worker thread exited with code: ${code}`);
  console.log(chalk.cyan("WORKER THREAD CALCULATION COMPLETE"));
  clearInterval(timer);

  // Output Perfomarnce Statistics
  performance.measure("non-threaded", "non-threaded:start", "non-threaded:end");
  performance.measure("threaded", "threaded:start", "threaded:end");
  performance
    .getEntriesByType("measure")
    .forEach((measure) => console.log(`${measure.name} ${measure.duration}ms`));
});
