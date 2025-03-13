function minZeroArray(nums: number[], queries: number[][]): number {
  const diffArray: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    if (i === 0) {
      diffArray.push(nums[i]);
    } else {
      diffArray.push(nums[i] - nums[i - 1]);
    }
  }
  diffArray.push(0);
  let i = 0;
  for (; i < queries.length + 1; i++) {
    if (nums.every((num) => num <= 0)) {
      break;
    }
    if (i === queries.length) {
      return -1;
    }
    const query = queries[i];
    const [l, r, val] = query;
    diffArray[l] -= val;
    diffArray[r + 1] += val;

    printDiffArray2(nums, diffArray);
  }

  return i;
}

function printDiffArray2(nums: number[], diffArray: number[]) {
  for (let i = 0; i < nums.length; i++) {
    if (i === 0) {
      nums[i] = diffArray[i];
    } else {
      nums[i] = diffArray[i] + nums[i - 1];
    }
  }
}

console.log(
  minZeroArray(
    [0],
    [
      [0, 0, 2],
      [0, 1, 5],
      [2, 2, 5],
      [0, 2, 4],
    ]
  )
);
