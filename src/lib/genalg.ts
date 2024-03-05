type FitnessFunc = (entity: string) => number;
function assignWeights(population: string[], fitness: FitnessFunc) {
  const fitnesses = population.map((e) => fitness(e));
  const totalFitness = fitnesses.reduce((acc, f) => acc + f, 0);
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
export function genAlgo(population: string[], fitness: FitnessFunc) {
  const bestScore = 0;
  const maxScore = (population[0].length * (population[0].length - 1)) / 2;
  while (bestScore < maxScore) {
    const weights = assignWeights(population, fitness);
    const nextGen = [];
  }
}
