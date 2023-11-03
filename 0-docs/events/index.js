/**
 * A stream emits an event whenever data is available to be read.
 * All objects that emit events are instances of the EventEmitter class.
 * These objects expose an eventEmitter.on() function that allows one or more function to be
 * attached to named events emitted by the object.
 *
 * Typically, event names are camel-cased strings, but any valid JS property key can be used.
 *
 * When the EventEmitter object emits an event, all of the functions attached to that specific event
 * are called synchronously.
 * Any values returned by the called listeners are ignored and discarded.
 */

setTimeout(() => {
  console.info("4. Execution of Timeout Callback Function");
}, 10);
setImmediate(() => {
  console.info("3. Execution of Immediate Callback Function");
});
process.nextTick(() => {
  console.info("2. Execution of NextTick Callback Function");
});
console.info("1. Execution of Main Module Ends");
