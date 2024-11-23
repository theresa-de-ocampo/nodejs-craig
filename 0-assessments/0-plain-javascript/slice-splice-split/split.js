/**
 * The split method of String values takes a pattern and divides this string into an ordered list of
 * substrings by searching for the pattern, puts these substrings into an array,
 * and returns the array.
 *
 * split(separator, limit)
 *
 * limit
 * It must be a non-negative integer.
 * If provided, splits the string at occurrence of the specified separator,
 * but stops when limit entries have been placed in the array.
 * Any leftover text is not included in the array at all.
 */
const sentence = "The quick brown fox jumps over the lazy dog.";

const words = sentence.split(" ");
console.log(words[3]);

const description = sentence.split(" ", 4);
console.log(description);
