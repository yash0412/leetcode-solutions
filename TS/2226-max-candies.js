"use strict";
function maximumCandies(candies, k) {
    let max = 0;
    candies.forEach((candyPile) => {
        if (candyPile > max) {
            max = candyPile;
        }
    });
    let left = 0, right = max + 1, result = -1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (canCCandiesBeDividedAmountKChildren(candies, k, mid)) {
            result = mid;
            left = mid + 1;
        }
        else {
            right = mid - 1;
        }
    }
    console.log(left, right, result);
    return result;
}
function canCCandiesBeDividedAmountKChildren(candies, k, c) {
    let validPiles = 0;
    for (let i = 0; i < candies.length; i++) {
        validPiles += Math.floor(candies[i] / c);
        if (validPiles >= k) {
            return true;
        }
    }
    return false;
}
console.log(maximumCandies([1, 2, 3, 4, 10], 5));
