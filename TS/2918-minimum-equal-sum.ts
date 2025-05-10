function minSum(nums1: number[], nums2: number[]): number {
  let nums1ZeroCount = 0;
  let nums2ZeroCount = 0;

  const nums1Sum = nums1.reduce((acc, curr) => {
    if (curr === 0) {
      nums1ZeroCount++;
    }
    return (acc += curr);
  }, 0);

  const nums2Sum = nums2.reduce((acc, curr) => {
    if (curr === 0) {
      nums2ZeroCount++;
    }
    return (acc += curr);
  }, 0);

  if (nums1ZeroCount === 0 && nums2ZeroCount === 0) {
    return nums1Sum === nums2Sum ? nums1Sum : -1;
  }

  if (nums1ZeroCount === 0) {
    if (nums1Sum > nums2Sum) {
      if (nums1Sum - nums2Sum >= nums2ZeroCount) {
        return nums1Sum;
      }
    }
    return -1;
  }

  if (nums2ZeroCount === 0) {
    if (nums2Sum > nums1Sum) {
      if (nums2Sum - nums1Sum >= nums1ZeroCount) {
        return nums2Sum;
      }
    }
    return -1;
  }

  let targetSum = Math.max(nums1Sum, nums2Sum) + 1;

  while (true) {
    const num1Diff = targetSum - nums1Sum;
    const num2Diff = targetSum - nums2Sum;

    if (num1Diff >= nums1ZeroCount && num2Diff >= nums2ZeroCount) {
      break;
    }
    targetSum++;
  }

  return targetSum;
}

console.log(minSum([3, 2, 0, 1, 0], [6, 5, 0]));
