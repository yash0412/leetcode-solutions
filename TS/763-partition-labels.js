"use strict";
function partitionLabels(s) {
    const result = [];
    let sumOfCharacters = 0;
    const characterMap = s.split('').reduce((acc, curr, index) => {
        if (!acc[curr]) {
            acc[curr] = index;
        }
        else {
            acc[curr] = index;
        }
        return acc;
    }, {});
    let start = 0, end = 0;
    while (start < s.length) {
        const char = s[start];
        if (characterMap[char] > end) {
            end = characterMap[char];
        }
        if (start === end) {
            result.push(start - sumOfCharacters + 1);
            sumOfCharacters += start - sumOfCharacters + 1;
        }
        start++;
    }
    return result;
}
console.log(partitionLabels('ababcbacadefegdehijhklij'));
