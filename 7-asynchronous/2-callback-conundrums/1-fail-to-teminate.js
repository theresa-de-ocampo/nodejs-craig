function wait(ms, callback) {
  ms = parseFloat(ms);

  if (!ms || ms < 1 || ms > 3000) {
    const err = new RangeError("Invalid ms value");
    setImmediate(callback, err, ms);
    return;
  }

  setTimeout(callback, ms, null, ms);
}

wait(0, (err, ms) => {
  if (err) console.log(err);
  else console.log(`Waited for ${ms}ms`);
});
