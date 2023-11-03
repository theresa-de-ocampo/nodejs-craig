const userName =
  process.argv[2] || process.env.USERNAME || process.env.USERNAME;
console.log(`Hello ${userName}!`);
