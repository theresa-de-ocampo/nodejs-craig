const EventEmitter = require("node:events");

const myEmitter = new EventEmitter();

myEmitter.on("first-event", function (a, b) {
  console.log(a, b, this, this === myEmitter);
});

// It is possible to use ES6 arrow functions, however, when doing so, this keyword will no longer
// reference the EventEmitter instance.
myEmitter.on("second-event", (a, b) => {
  console.log(a, b, this);
});

myEmitter.emit("first-event", "a", "b");
console.log(" ");
myEmitter.emit("second-event", "a", "b");
