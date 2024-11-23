/**
 * The splice method of array instances changes the contents of an array by removing or replacing
 * existing elements, and/or adding new elements in place.
 *
 * split(start, deleteCount, item1, item2, ... itemN)
 */

const months = ["Jan", "March", "June"];
console.log(months);
console.log(" ");

console.log('months.splice(1, 0, "Feb")');
months.splice(1, 0, "Feb");
console.log(months);
console.log(" ");

console.log('months.splice(3, 0, "April", "May")');
months.splice(3, 0, "April", "May");
console.log(months);
console.log(" ");

const animals = ["dog", "cat", "panda", "spiders", "fish", "bird", "scorpion"];
console.log(animals);
console.log(" ");

// Every element starting from index 2 will be removed.
console.log("animals.splice(2)");
// This will output an array containing all of the elements that were removed
// console.log(animals.splice(2));
console.log(animals);
