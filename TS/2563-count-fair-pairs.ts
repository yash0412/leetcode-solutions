function countFairPairs(nums: number[], lower: number, upper: number): number {
  let fairPairsCount = 0;
  nums.sort((a, b) => a - b);
  console.log(nums);

  for (let i = 0; i < nums.length; i++) {
    let start = i + 1,
      end = nums.length - 1;
    let lowVal = -1;
    while (start <= end) {
      const mid = Math.floor((start + end) / 2);
      if (nums[i] + nums[mid] >= lower) {
        lowVal = mid;
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    }

    let highVal = -1;
    start = i + 1;
    end = nums.length - 1;
    while (start <= end) {
      const mid = Math.floor((start + end) / 2);
      if (nums[i] + nums[mid] <= upper) {
        highVal = mid;
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    }

    console.log(nums[i], nums[lowVal], nums[highVal]);

    if (lowVal !== -1 && highVal !== -1) {
      fairPairsCount += highVal - lowVal + 1;
    }
  }

  return fairPairsCount;
}

console.log(countFairPairs([-5, -7, -5, -7, -5], -12, -12));
