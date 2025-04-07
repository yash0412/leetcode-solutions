"use strict";
function canPartition(nums) {
    const totalSum = nums.reduce((a, c) => (a += c), 0);
    if (totalSum % 2 !== 0) {
        return false;
    }
    const targetSum = totalSum / 2;
    const dp = new Array(targetSum + 1).fill(false);
    dp[0] = true;
    nums.forEach((num) => {
        for (let i = targetSum; i >= num; i--) {
            dp[i] || (dp[i] = dp[i - num]);
        }
    });
    return dp[targetSum];
}
console.log(canPartition([1, 5, 11, 5]));
