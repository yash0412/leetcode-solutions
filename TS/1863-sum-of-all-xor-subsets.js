"use strict";
function subsetXORSum(nums) {
    const subSets = getSubsets(nums);
    let xorSum = 0;
    subSets.forEach((subset) => {
        xorSum += getXOR(subset);
    });
    return xorSum;
}
function getSubsets(arr) {
    let result = [];
    function backtrack(index, current) {
        if (index === arr.length) {
            result.push([...current]);
            return;
        }
        // Exclude the current element
        backtrack(index + 1, current);
        // Include the current element
        current.push(arr[index]);
        backtrack(index + 1, current);
        current.pop(); // Backtrack step
    }
    backtrack(0, []);
    return result;
}
function getXOR(nums) {
    if (nums.length === 0) {
        return 0;
    }
    return nums.reduce((sum, acc, index) => (index === 0 ? sum : sum ^ acc), nums[0]);
}
console.log(subsetXORSum([3, 4, 5, 6, 7, 8]));
