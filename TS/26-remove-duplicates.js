"use strict";
function removeDuplicates(nums) {
    let uniqueElementsCount = 0;
    const uniqueElementsMap = {};
    for (let i = 0; i < nums.length; i++) {
        if (!uniqueElementsMap[nums[i]]) {
            uniqueElementsMap[nums[i]] = true;
            nums[uniqueElementsCount] = nums[i];
            uniqueElementsCount++;
        }
    }
    return uniqueElementsCount;
}
class Queue {
    constructor() {
        this.data = [];
        this.start = 0;
        this.end = -1;
    }
    length() {
        if (this.start <= this.end) {
            return this.end - this.start + 1;
        }
        return 0;
    }
    push(elem) {
        this.data.push(elem);
        this.end++;
    }
    pop() {
        if (this.length() > 0) {
            const elem = this.data[this.start];
            if (this.start === this.end) {
                this.data = [];
                this.start = 0;
                this.end = -1;
            }
            else {
                this.start++;
            }
            return elem;
        }
        throw new Error('No elements in the queue');
    }
}
console.log(removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]));
