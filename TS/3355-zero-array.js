"use strict";
function isZeroArray(nums, queries) {
    const diffArray = [];
    for (let i = 0; i < nums.length; i++) {
        if (i === 0) {
            diffArray.push(nums[i]);
        }
        else {
            diffArray.push(nums[i] - nums[i - 1]);
        }
    }
    diffArray.push(0);
    console.log(diffArray);
    queries.forEach((query) => {
        const [i, j] = query;
        diffArray[i] -= 1;
        diffArray[j + 1] += 1;
    });
    printDiffArray(nums, diffArray);
    console.log(nums);
    return nums.every((num) => num <= 0);
}
function printDiffArray(nums, diffArray) {
    for (let i = 0; i < nums.length; i++) {
        if (i === 0) {
            nums[i] = diffArray[i];
        }
        else {
            nums[i] = diffArray[i] + nums[i - 1];
        }
    }
}
console.log(isZeroArray([1, 2, 3, 4, 5, 56, 6, 7, 9], [[0, 5]]));
