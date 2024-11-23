/**
 * The slice method of Array instances returns a shallow copy of a portion of an array into new
 * array object selected from start to end (end not included) where start and end represent
 * the index of items in that array. It doesn't change the original array.
 *
 * https://www.freecodecamp.org/news/lets-clear-up-the-confusion-around-
 * the-slice-splice-split-methods-in-javascript-8ba3266c29ae/
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
 */

const animals = ["dog", "cat", "panda", "spiders", "fish", "bird", "scorpion"];

console.clear();
console.log(animals);
console.log(" ");

console.log("animals.slice(0, 2)");
console.log(animals.slice(0, 2));
console.log(" ");

console.log("animals.slice(1)");
console.log(animals.slice(1));
console.log(" ");

console.log("animals.slice(2, 5)");
console.log(animals.slice(2, 5));
console.log(" ");

// end + array.length
// animals[-2 + 7] = animals[5]
console.log("animals.slice(-2)");
console.log(animals.slice(-2));
console.log(" ");

console.log("animals.slice(2, -1)");
console.log(animals.slice(2, -1));
console.log(" ");

// The start index -2 is greater than the end index -5.
// When the start index is greater than the end index, slice returns an empty array.
console.log("animals.slice(-2, -5)");
console.log(animals.slice(-2, -5));
console.log(" ");
