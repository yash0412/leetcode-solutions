"use strict";
class MinHeapClass {
    constructor() {
        this.heap = [];
    }
    getParentIndex(index) {
        return Math.floor((index - 1) / 2);
    }
    hasParent(index) {
        return this.getParentIndex(index) >= 0;
    }
    getLeftChildIndex(index) {
        return index * 2 + 1;
    }
    hasLeftChild(index) {
        return this.getLeftChildIndex(index) < this.heap.length;
    }
    getRightChildIndex(index) {
        return index * 2 + 2;
    }
    hasRightChild(index) {
        return this.getRightChildIndex(index) < this.heap.length;
    }
    swap(index1, index2) {
        const temp = this.heap[index1];
        this.heap[index1] = this.heap[index2];
        this.heap[index2] = temp;
    }
    heapifyDown() {
        let index = 0;
        while (this.hasLeftChild(index)) {
            let smallerChildIndex = this.getLeftChildIndex(index);
            if (this.hasRightChild(index) &&
                this.heap[this.getRightChildIndex(index)].cost <
                    this.heap[smallerChildIndex].cost) {
                smallerChildIndex = this.getRightChildIndex(index);
            }
            if (this.heap[index] < this.heap[smallerChildIndex]) {
                break;
            }
            else {
                this.swap(index, smallerChildIndex);
            }
            index = smallerChildIndex;
        }
    }
    heapifyUp() {
        let index = this.heap.length - 1;
        while (this.hasParent(index)) {
            const parentIndex = this.getParentIndex(index);
            if (this.heap[parentIndex].cost > this.heap[index].cost) {
                this.swap(index, parentIndex);
            }
            index = parentIndex;
        }
    }
    peek() {
        if (this.heap.length > 0) {
            return this.heap[0];
        }
        return undefined;
    }
    pop() {
        const item = this.peek();
        if (item === undefined) {
            return undefined;
        }
        this.heap[0] = this.heap[this.heap.length - 1];
        this.heap.length--;
        this.heapifyDown();
        return item;
    }
    insert(val) {
        this.heap.push(val);
        this.heapifyUp();
        console.log(this.heap);
    }
    get size() {
        return this.heap.length;
    }
}
function minTimeToReach(moveTime) {
    const heap = new MinHeapClass();
    heap.insert({ cost: 0, x: 0, y: 0 });
    const xSize = moveTime.length;
    const ySize = moveTime[0].length;
    const seen = Array.from({ length: xSize }, () => Array(ySize));
    const d = Array.from({ length: xSize }, () => Array(ySize).fill(Infinity));
    d[0][0] = 0;
    while (heap.size) {
        const elem = heap.pop();
        if (!elem) {
            continue;
        }
        if (seen[elem.x][elem.y]) {
            continue;
        }
        seen[elem.x][elem.y] = true;
        getNeighbourCoords2(elem, xSize, ySize).forEach(([x, y]) => {
            const cost = Math.max(d[elem.x][elem.y], moveTime[x][y]) + 1;
            if (d[x][y] > cost) {
                d[x][y] = cost;
                const newElem = {
                    x,
                    y,
                    cost,
                };
                heap.insert(newElem);
            }
        });
    }
    return d[xSize - 1][ySize - 1];
}
function subtract(a, b) {
    const diff = a - b;
    return diff < 0 ? 0 : diff;
}
function getNeighbourCoords2(coord, xSize, ySize) {
    return [
        [-1, 0],
        [0, -1],
        [1, 0],
        [0, 1],
    ]
        .map(([dx, dy]) => {
        return [coord.x + dx, coord.y + dy];
    })
        .filter(([x, y]) => {
        if (x >= 0 && x < xSize && y >= 0 && y < ySize) {
            return true;
        }
        return false;
    });
}
console.log(minTimeToReach([
    [96, 15, 101, 24, 36, 105, 11, 13, 30],
    [77, 50, 63, 101, 55, 56, 50, 15, 84],
    [15, 34, 118, 80, 94, 19, 9, 23, 40],
    [30, 29, 81, 117, 66, 88, 106, 90, 30],
    [78, 19, 5, 16, 94, 69, 99, 103, 8],
    [108, 82, 107, 64, 85, 57, 107, 44, 12],
    [37, 43, 72, 51, 72, 117, 57, 117, 47],
    [109, 5, 78, 11, 94, 36, 81, 42, 44],
]));
