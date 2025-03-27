function minimumIndex(nums: number[]): number {
  let dominantElement = nums[0],
    count = 0,
    prefixSum = 0;

  for (const num of nums) {
    if (count === 0) {
      dominantElement = num;
    }
    count += num === dominantElement ? 1 : -1;
  }
  const totalCount = nums.reduce(
    (acc, num) => (num === dominantElement ? acc + 1 : acc),
    0
  );

  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] === dominantElement) {
      prefixSum++;
    }
    if (isValidSplit(i, prefixSum, totalCount, nums.length)) {
      return i;
    }
  }

  return -1;
}

function isValidSplit(
  splitIndex: number,
  prefixSum: number,
  domCount: number,
  totalElements: number
): boolean {
  const leftCount = prefixSum;
  const rightCount = domCount - leftCount;

  return (
    isDominant(leftCount, splitIndex + 1) &&
    isDominant(rightCount, totalElements - splitIndex - 1)
  );
}

function isDominant(domCount: number, totalElements: number): boolean {
  return domCount > totalElements / 2;
}

console.log(minimumIndex([2, 1, 3, 1, 1, 1, 7, 1, 2, 1]));
