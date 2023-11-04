export default function diceRoller(runs = 1, dice = 2, sides = 6) {
  // Records the count of total occurrences (sum of the values of dices)
  // which should result in a Normal Distribution curve
  const stat = [];

  while (runs > 0) {
    let sum = 0;
    for (let d = dice; d > 0; d--) {
      sum += Math.floor(Math.random() * sides) + 1;
    }

    stat[sum] = (stat[sum] || 0) + 1;

    runs--;
  }

  return stat;
}
