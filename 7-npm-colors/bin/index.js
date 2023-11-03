#!/usr/bin/env node

import chalk from "chalk";
import readline from "readline/promises";

const prompt = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let sendMessage = true;

while (sendMessage) {
  console.clear();
  const message = await prompt.question(
    chalk.blue("What is your message?\n    ")
  );

  const color = await prompt.question(
    chalk.blue("\nWhat color do you want to use?\n    ")
  );

  console.log(`\n${chalk[color.toLocaleLowerCase()](message)}\n`);

  const repeat = await prompt.question(
    chalk.blue("Do another? [Y] Yes or [N] No\n    ")
  );
  sendMessage = repeat.toUpperCase() === "Y";
}

prompt.close();
