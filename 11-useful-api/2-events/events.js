import Ticker from "./lib/ticker.js";

const ticker = new Ticker(1000);

ticker.on("tick", (e) => {
  console.log("Hanlder 1 Tick!", e);
});

ticker.on("tick", (e) => {
  console.log("Hanlder 2 Tick!", e);
});

ticker.once("tick", (e) => {
  console.log("Hanlder 3 Tick!", e);
});

// Show number of listeners
console.log(`Listeners: ${ticker.listenerCount("tick")}`);
