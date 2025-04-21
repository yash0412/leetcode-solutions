"use strict";
function numberOfArrays(differences, lower, upper) {
    let max = 0, min = 0;
    let currentNum = 0;
    for (let difference of differences) {
        currentNum += difference;
        if (currentNum > max) {
            max = currentNum;
        }
        if (currentNum < min) {
            min = currentNum;
        }
    }
    const lowerBound = lower - min;
    const upperBound = upper - max;
    const diff = upperBound - lowerBound + 1;
    return diff < 0 ? 0 : diff;
}
console.log(numberOfArrays([-40], -46, 53));
