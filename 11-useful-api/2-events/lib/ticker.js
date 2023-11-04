import EventEmitter from "events";
import { Performance } from "perf_hooks";

export default class Ticker extends EventEmitter {
  constructor(delay) {
    super();
    this.delay = delay;
    this.interval = null;

    this.start(delay);
  }

  start(delay) {
    if (!delay) return;

    if (this.interval) {
      clearInterval(this.interval);
    }

    this.delay = delay;

    this.interval = setInterval(() => {
      this.emit("tick", {
        delay: this.delay,
        time: performance.now()
      });
    }, this.delay);
  }
}
