import { getRandomInt, weightedRandChoice } from "./utils";
export type GenAlgoOptions = Partial<{
  populationSize: number;
  timeout: number;
  mutationRate: number;
  mixingNumber: number;
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
const MIXING_NUMBER = 2;
const CUTOFF_TIME = 50000;
const MUTATE_PROBABILITY = 0.03;
const POPULATION_SIZE = 200;
function mutate(entity: EntityType, p: number) {
  const n = entity.length;
  const index = getRandomInt(n);
  return Math.random() < p
    ? entity.substring(0, index) +
        encode(getRandomInt(n)) +
        entity.substring(index + 1)
    : entity;
  //return entity
  //.split("")
  //.map((q) => (Math.random() < p ? encode(getRandomInt(n)) : q))
  //.join("");
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
  const mixingNumber = options?.mixingNumber ?? MIXING_NUMBER;
  const startTime = Date.now();
  let generationCount = 0;
  const bestFound: EntityType[] = [];
  let bestScore = 0;
  let population = generateInitialPopulation(n, populationSize);
  const maxScore = (population[0].length * (population[0].length - 1)) / 2;
  while (bestScore < maxScore && Date.now() - startTime < cutoffTime) {
    const weights = assignWeights(population, fitness);
    const nextGen = [];
    for (let i = 0; i < population.length; i++) {
      //const [p1, p2] = ;
      let child = reproduce(
        ...weightedRandChoice(population, weights, mixingNumber)
      );

      if (Math.random() < mutateProbability)
        child = mutate(child, mutateProbability);
      const score = fitness(child);
      if (score >= bestScore) {
        if (score > bestScore) {
          bestScore = score;
          bestFound.splice(0, bestFound.length);
          bestFound.push(child);
        } else {
          bestFound.push(child);
        }
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

function reproduce(...parents: EntityType[]) {
  const n = parents[0].length;
  return parents.reduce(
    (acc, parent, index) => {
      const c = getRandomInt(acc.rem);

      //console.log(acc);
      return {
        str: acc.str.concat(
          index === parents.length - 1
            ? parent.slice(acc.index)
            : parent.slice(acc.index, acc.index + c)
        ),
        index: acc.index + c,
        rem: acc.rem - c,
      };
    },
    { str: "", rem: n, index: 0 }
  ).str;
  //return p1.slice(0, c).concat(p2.slice(c));
}
