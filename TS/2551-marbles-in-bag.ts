function putMarbles(weights: number[], k: number): number {
  const cutValues = weights.reduce((acc, curr, index, arr) => {
    if (index !== arr.length - 1) {
      acc.push(curr + arr[index + 1]);
    }
    return acc;
  }, [] as number[]);

  cutValues.sort((a, b) => a - b);

  let minSum = weights[0] + weights[weights.length - 1];
  let maxSum = minSum;
  for (let i = 0; i < k - 1; i++) {
    minSum += cutValues[i];
  }

  for (let i = cutValues.length - 1; i > cutValues.length - k; i--) {
    maxSum += cutValues[i];
  }

  return maxSum - minSum;
}

console.log(putMarbles([1, 3], 2));
