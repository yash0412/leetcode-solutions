"use strict";
function numberOfPowerfulInt(start, finish, limit, s) {
    let powerfulIntegersCount = 0;
    let lengthOfPrefix = 1;
    let maxPrefixVal = getMaxPrefixVal(limit, lengthOfPrefix);
    let prefix = 1;
    while (true) {
        if (prefix > maxPrefixVal) {
            lengthOfPrefix++;
            maxPrefixVal = getMaxPrefixVal(limit, lengthOfPrefix);
            prefix = 1;
        }
        else {
            break;
        }
    }
    return powerfulIntegersCount;
}
function getPrefix(limit, lengthOfPrefix) {
    return 0;
}
function getMaxPrefixVal(limit, lengthOfPrefix) {
    let maxPrefixVal = 0;
    for (let i = 0; i < lengthOfPrefix; i++) {
        maxPrefixVal += Math.pow(10, i) * limit;
    }
    return maxPrefixVal;
}
