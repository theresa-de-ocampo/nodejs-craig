console.clear();

const testObject = {
  name: "Teriz",
  age: 23,
  job: "Full-Stack JavaScript Developer",
  techStack: {
    frontEnd: "NextJS",
    backEnd: "NodeJS",
    database: "Postgres"
  }
};

console.dir(testObject);
console.log(" ");
console.table(testObject);
console.count();
console.log(" ");

console.group("Other Useful Methods");
console.log("Indentation");
console.log("This will be indented as well");
console.groupEnd("Other Useful Methods");
console.log(" ");
console.log("This will no longer be indented");
