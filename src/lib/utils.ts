export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}
export function weightedRandChoice(
  population: number[][],
  weights: number[],
  select: number
) {
  const selection: number[] = [];
  for (let i = 0; i < select; i++) {
    let index = weightedRand(weights)!;
    while (selection.indexOf(index) >= 0) index = weightedRand(weights)!;
    selection.push(index);
  }
  return selection.map((index) => population[index]);
}
export function weightedRand(weights: number[]) {
  let i,
    sum = 0,
    r = Math.random();
  for (i in weights) {
    sum += weights[i];
    if (r <= sum) return parseInt(i);
  }
}
