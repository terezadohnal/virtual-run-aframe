export function getRandomWithWeights(weights) {
  let totalWeight = weights.reduce((acc, weight) => acc + weight, 0);
  let normalizedWeights = weights.map((weight) => weight / totalWeight);

  let random = Math.random();

  let cumulativeWeight = 0;
  for (let i = 0; i < normalizedWeights.length; i++) {
    cumulativeWeight += normalizedWeights[i];
    if (random < cumulativeWeight) {
      return i;
    }
  }
}
