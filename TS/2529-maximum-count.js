"use strict";
function maximumCount(nums) {
    let posCount = 0, negCount = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] < 0) {
            negCount++;
        }
        else if (nums[i] > 0) {
            posCount++;
        }
    }
    return posCount > negCount ? posCount : negCount;
}
console.log(maximumCount([-2, -1, -1, 1, 2, 3]));
