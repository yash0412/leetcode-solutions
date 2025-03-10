function searchInsert(nums: number[], target: number): number {
  let low = 0,
    high = nums.length - 1,
    mid = Math.floor((high + low) / 2);

  if (nums[high] < target) {
    return high + 1;
  }

  if (nums[low] > target) {
    return 0;
  }

  while (high >= low) {
    console.log(high, low, mid);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
    mid = Math.floor((high + low) / 2);
    console.log(high, low, mid);
  }

  return high + 1;
}

console.log(searchInsert([1, 3, 5, 6], 2));
