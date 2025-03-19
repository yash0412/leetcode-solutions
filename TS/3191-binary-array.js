"use strict";
function minOperations(nums) {
    let operationsCount = 0;
    let start = 0;
    while (start < nums.length) {
        if (nums[start] === 0) {
            if (start > nums.length - 3) {
                return -1;
            }
            operationsCount++;
            let i = start;
            while (i < start + 3) {
                nums[i] = nums[i] === 1 ? 0 : 1;
                i++;
            }
        }
        start++;
    }
    return operationsCount;
}
console.log(minOperations([0, 1, 1, 1, 0, 0]));
console.log(minOperations([0, 1, 1, 1]));
