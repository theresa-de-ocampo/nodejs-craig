import { workerData, parentPort } from "worker_threads";
import diceRoller from "./lib/dice-roller.js";

const stat = diceRoller(workerData.runs, workerData.numberOfDice);
parentPort.postMessage(stat);
