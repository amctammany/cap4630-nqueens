import { getRandomInt, weightedRandChoice } from "./utils";
export type GenAlgoOptions = Partial<{
  populationSize: number;
  timeout: number;
  mutationRate: number;
  p: number;
}>;
type EntityType = string; //number[]
type FitnessFunc = (entity: EntityType) => number;
function assignWeights(population: EntityType[], fitness: FitnessFunc) {
  const fitnesses = population.map((e) => fitness(e));
  const totalFitness = fitnesses.reduce((acc, f) => acc + f, 0);
  return fitnesses.map((f) => f / totalFitness);
}
export function findNonConflictingPairs(entity: EntityType) {
  let score = 0;
  const k = entity.length;
  for (let i = 0; i < k; i++) {
    const row1 = decode(entity[i]);
    for (let j = i + 1; j < k; j++) {
      const row2 = decode(entity[j]);
      if (i === j) continue;
      if (row1 === row2) continue;
      if (row2 + j == i + row1) continue;
      if (j - row2 == i - row1) continue;
      score += 1;
    }
  }
  return score / 1;
}
const alphabet = Object.fromEntries(
  "abcdefghijklmnopqrstuvwxyz".split("").map((letter, i) => [i, letter])
);
export const encode = (n: number) => alphabet[n];
export const decode = (letter: string) => letter.charCodeAt(0) - 97;
const CUTOFF_TIME = 50000;
const MUTATE_PROBABILITY = 0.03;
const POPULATION_SIZE = 200;
function mutate(entity: EntityType) {
  const n = entity.length;
  return entity
    .split("")
    .map((q) =>
      Math.random() < MUTATE_PROBABILITY ? encode(getRandomInt(n)) : q
    )
    .join("");
}
function createRandomOrganism(n: number) {
  return function () {
    return Array.from({ length: n })
      .map(() => getRandomInt(n))
      .map((n) => encode(n))
      .join("");
  };
}
export function generateInitialPopulation(n: number, size: number) {
  return Array.from({ length: size }).map(createRandomOrganism(n));
}
export function genAlgo(
  //population: string[],
  n: number,
  fitness: FitnessFunc,
  options: GenAlgoOptions = {}
) {
  //console.log(options);
  const cutoffTime = options?.timeout ?? CUTOFF_TIME;
  const mutateProbability = options?.mutationRate ?? MUTATE_PROBABILITY;
  const populationSize = options?.populationSize ?? POPULATION_SIZE;
  const startTime = Date.now();
  let generationCount = 0;
  let bestFound: EntityType | undefined = undefined;
  let bestScore = 0;
  let population = generateInitialPopulation(n, populationSize);
  const maxScore = (population[0].length * (population[0].length - 1)) / 2;
  while (bestScore < maxScore && Date.now() - startTime < cutoffTime) {
    const weights = assignWeights(population, fitness);
    const nextGen = [];
    for (let i = 0; i < population.length; i++) {
      const [p1, p2] = weightedRandChoice(population, weights, 2);
      let child = reproduce(p1, p2);

      if (Math.random() < mutateProbability) child = mutate(child);
      const score = fitness(child);
      if (score > bestScore) {
        bestFound = child;
        bestScore = score;
      }
      nextGen.push(child);
    }
    population = nextGen;
    generationCount++;
  }
  return {
    bestFound,
    bestScore,
    maxScore,
    generationCount,
    optimalFound: bestScore === maxScore,
    timeElapsed: Date.now() - startTime,
  };
}

function reproduce(p1: EntityType, p2: EntityType) {
  const n = p1.length;
  const c = getRandomInt(n);
  //return p1.slice(0, c).concat(p2.slice(c));
  return `${p1.slice(0, c)}${p2.slice(c)}`;
}
