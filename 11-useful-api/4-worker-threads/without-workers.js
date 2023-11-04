import diceRoller from "./lib/dice-roller.js";

const timer = setInterval(() => {
  console.log(" another process");
}, 1000);

const runs = 10;
diceRoller(runs);
