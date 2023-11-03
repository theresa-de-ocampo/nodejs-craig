/**
 * JavaScript is one of the so called garbage collected languages.
 * Garbage collected languages helps developers manage memory by periodically checking which
 * previously allocatted pieces of memory can still be reached from other parts of the application.
 *
 * In other words, garbage collected languages reduce the problem of managing memory from
 * "what memory is still required" to "what memory can still be reached from other parts the app?"
 * The difference is subtle, but important: while only developer knows whether a piece of
 * allocated memory will be required in the future, unreachable memory can be algorithmically
 * determined and marked for return to the OS.
 */

/**
 * Non-garbage collected languages usually employ other techniques to manage memory:
 * (1) Explicit Management where the developer explicitly tells the compiler when a piece of memory
 *    is not required.
 * (2) Reference Counting in which a use count is associated with every block of memory. When the
 *    count eaches zero it is returned to the OS.
 *
 * These techniques come with their own trade-offs, and potential causes for leaks.
 */

/**
 * The main cause for leaks in garbage collected languages are unwanted references.
 * To understand what unwanted references are, first we need to understand how a garbage collector
 * determines whether a piece of memory can be reached or not.
 *
 * https://auth0.com/blog/four-types-of-leaks-in-your-javascript-code-and-how-to-get-rid-of-them/
 */

// Failing to terminate an asynchronous function after callback

function wait(ms, callback) {
  ms = parseFloat(ms);

  if (!ms || ms < 1 || ms > 3000) {
    const err = new RangeError("Invalid ms value");
    callback(err, ms);
    return;
  }

  setTimeout(callback, ms, null, ms);
}

wait(0, (err, ms) => {
  if (err) console.log(err);
  else console.log(`Waited for ${ms}ms`);

  // console.log(`Waited for ${ms}ms`);
});
