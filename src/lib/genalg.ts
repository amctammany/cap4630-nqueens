import { getRandomInt, weightedRandChoice } from "./utils";

type FitnessFunc = (entity: string) => number;
function assignWeights(population: string[], fitness: FitnessFunc) {
  const fitnesses = population.map((e) => fitness(e));
  const totalFitness = fitnesses.reduce((acc, f) => acc + f, 0);
  console.log({ fitnesses, totalFitness });
  return fitnesses.map((f) => f / totalFitness);
}
export function findNonConflictingPairs(entity: string) {
  let score = 0;
  const k = entity.length;
  for (let i = 0; i < k; i++) {
    const row1 = parseInt(entity[i]);
    for (let j = i + 1; j < k; j++) {
      const row2 = parseInt(entity[j]);
      if (i === j) continue;
      if (row1 === row2) continue;
      if (row2 + j == i + row1) continue;
      if (j - row2 == i - row1) continue;
      score += 1;
    }
  }
  return score / 1;
}
const cutoffTime = 10000;
const MUTATE_PROBABILITY = 0.03;
function mutate(entity: string) {
  const n = entity.length;
  //const index = getRandomInt(n);
  return entity
    .split("")
    .map((q, i) =>
      Math.random() < MUTATE_PROBABILITY ? getRandomInt(n).toString() : q
    )
    .join("");
  //return (entity[index] = getRandomInt(n).toString());
}
export function genAlgo(population: string[], fitness: FitnessFunc) {
  const startTime = Date.now();
  let bestFound: string | undefined = undefined;
  let bestScore = 0;
  const maxScore = (population[0].length * (population[0].length - 1)) / 2;
  while (bestScore < maxScore && Date.now() - startTime < cutoffTime) {
    const weights = assignWeights(population, fitness);
    console.log(weights);
    const nextGen = [];
    for (let i = 0; i < population.length; i++) {
      const [p1, p2] = weightedRandChoice(population, weights, 2);
      let child = reproduce(p1, p2);

      if (Math.random() < MUTATE_PROBABILITY) child = mutate(child);
      const score = fitness(child);
      console.log(child, score);
      if (score > bestScore) {
        bestFound = child;
        bestScore = score;
      }
      nextGen.push(child);
    }
    //const fitnesses = population.map((e) => fitness(e));
    //const
    population = nextGen;
  }
  console.log({ bestFound, bestScore });
}

function reproduce(p1: string, p2: string) {
  const n = p1.length;
  const c = getRandomInt(n);
  return `${p1.slice(0, c)}${p2.slice(c)}`;
}
