"use strict";
function countPaths(n, roads) {
    const MOD = 1e9 + 7;
    const graph = Array.from({ length: n }, () => []);
    for (const [a, b, time] of roads) {
        graph[a].push([b, time]);
        graph[b].push([a, time]);
    }
    const minDist = new Array(n).fill(Infinity), ways = new Array(n).fill(0);
    (minDist[0] = 0), (ways[0] = 1);
    const minHeap = new Heap((a, b) => a[0] - b[0], [[0, 0]]);
    while (minHeap.size) {
        const [dist, node] = minHeap.dequeue();
        if (dist > minDist[node])
            continue;
        for (const [neighbor, time] of graph[node]) {
            const newDist = dist + time;
            if (newDist < minDist[neighbor]) {
                minDist[neighbor] = newDist;
                ways[neighbor] = ways[node];
                minHeap.enqueue([newDist, neighbor]);
            }
            else if (newDist === minDist[neighbor]) {
                ways[neighbor] = (ways[neighbor] + ways[node]) % MOD;
            }
        }
    }
    return ways[n - 1];
}
class Heap {
    /**
     * Construct a new Heap with the given comparator.
     * @param comparator - The comparator to use when ordering values in the heap.
     * For MinHeap use (a, b) => a - b, for MaxHeap use (a, b) => b - a
     */
    constructor(comparator, arr = []) {
        this.comparator = comparator;
        Heap.heapify((this.heap = arr), this.comparator);
    }
    get size() {
        return this.heap.length;
    }
    bubbleUp() {
        let idx = this.heap.length - 1;
        const element = this.heap[idx];
        while (idx > 0) {
            const parentIdx = Math.floor((idx - 1) / 2);
            const parent = this.heap[parentIdx];
            if (this.comparator(element, parent) >= 0)
                break;
            this.heap[parentIdx] = element;
            this.heap[idx] = parent;
            idx = parentIdx;
        }
    }
    bubbleDown() {
        let idx = 0;
        const length = this.heap.length;
        const element = this.heap[0];
        while (true) {
            const leftChildIdx = 2 * idx + 1;
            const rightChildIdx = 2 * idx + 2;
            let leftChild, rightChild;
            let swap = null;
            if (leftChildIdx < length) {
                leftChild = this.heap[leftChildIdx];
                if (this.comparator(leftChild, element) < 0) {
                    swap = leftChildIdx;
                }
            }
            if (rightChildIdx < length) {
                rightChild = this.heap[rightChildIdx];
                if ((!swap && this.comparator(rightChild, element) < 0) ||
                    (swap && this.comparator(rightChild, leftChild) < 0)) {
                    swap = rightChildIdx;
                }
            }
            if (swap === null)
                break;
            this.heap[idx] = this.heap[swap];
            this.heap[swap] = element;
            idx = swap;
        }
    }
    enqueue(val) {
        this.heap.push(val);
        this.bubbleUp();
    }
    dequeue() {
        const max = this.heap[0];
        const end = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.bubbleDown();
        }
        return max;
    }
    front() {
        return this.heap[0];
    }
    toArray() {
        return this.heap;
    }
    static heapify(arr, comparator) {
        const siftDown = (index) => {
            const length = arr.length;
            while (true) {
                const leftChildIdx = 2 * index + 1;
                const rightChildIdx = 2 * index + 2;
                let smallest = index;
                if (leftChildIdx < length &&
                    comparator(arr[leftChildIdx], arr[smallest]) < 0) {
                    smallest = leftChildIdx;
                }
                if (rightChildIdx < length &&
                    comparator(arr[rightChildIdx], arr[smallest]) < 0) {
                    smallest = rightChildIdx;
                }
                if (smallest === index)
                    break;
                [arr[index], arr[smallest]] = [arr[smallest], arr[index]];
                index = smallest;
            }
        };
        for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--)
            siftDown(i);
    }
}
console.log(countPaths(18, [
    [0, 1, 3972],
    [2, 1, 1762],
    [3, 1, 4374],
    [0, 3, 8346],
    [3, 2, 2612],
    [4, 0, 6786],
    [5, 4, 1420],
    [2, 6, 7459],
    [1, 6, 9221],
    [6, 3, 4847],
    [5, 6, 4987],
    [7, 0, 14609],
    [7, 1, 10637],
    [2, 7, 8875],
    [7, 6, 1416],
    [7, 5, 6403],
    [7, 3, 6263],
    [4, 7, 7823],
    [5, 8, 10184],
    [8, 1, 14418],
    [8, 4, 11604],
    [7, 8, 3781],
    [8, 2, 12656],
    [8, 0, 18390],
    [5, 9, 15094],
    [7, 9, 8691],
    [9, 6, 10107],
    [9, 1, 19328],
    [9, 4, 16514],
    [9, 2, 17566],
    [9, 0, 23300],
    [8, 9, 4910],
    [9, 3, 14954],
    [4, 10, 26060],
    [2, 10, 27112],
    [10, 1, 28874],
    [8, 10, 14456],
    [3, 10, 24500],
    [5, 10, 24640],
    [10, 6, 19653],
    [10, 0, 32846],
    [10, 9, 9546],
    [10, 7, 18237],
    [11, 7, 21726],
    [11, 2, 30601],
    [4, 11, 29549],
    [11, 0, 36335],
    [10, 11, 3489],
    [6, 11, 23142],
    [3, 11, 27989],
    [11, 1, 32363],
    [11, 8, 17945],
    [9, 11, 13035],
    [5, 11, 28129],
    [2, 12, 33902],
    [5, 12, 31430],
    [6, 12, 26443],
    [4, 12, 32850],
    [12, 3, 31290],
    [11, 12, 3301],
    [12, 1, 35664],
    [7, 13, 28087],
    [13, 8, 24306],
    [6, 13, 29503],
    [11, 13, 6361],
    [4, 13, 35910],
    [13, 12, 3060],
    [3, 13, 34350],
    [13, 5, 34490],
    [13, 2, 36962],
    [10, 13, 9850],
    [9, 13, 19396],
    [12, 14, 8882],
    [8, 14, 30128],
    [14, 6, 35325],
    [14, 5, 40312],
    [1, 14, 44546],
    [11, 14, 12183],
    [15, 12, 13581],
    [2, 15, 47483],
    [4, 15, 46431],
    [15, 10, 20371],
    [15, 14, 4699],
    [15, 6, 40024],
    [15, 7, 38608],
    [1, 15, 49245],
    [11, 15, 16882],
    [8, 15, 34827],
    [0, 15, 53217],
    [5, 15, 45011],
    [15, 3, 44871],
    [16, 2, 53419],
    [16, 9, 35853],
    [1, 16, 55181],
    [16, 7, 44544],
    [8, 16, 40763],
    [0, 16, 59153],
    [15, 16, 5936],
    [16, 10, 26307],
    [16, 6, 45960],
    [12, 16, 19517],
    [17, 2, 57606],
    [17, 3, 54994],
    [17, 14, 14822],
    [17, 11, 27005],
    [0, 17, 63340],
    [17, 7, 48731],
    [8, 17, 44950],
    [17, 16, 4187],
    [5, 17, 55134],
    [17, 10, 30494],
    [17, 9, 40040],
    [17, 12, 23704],
    [13, 17, 20644],
    [17, 1, 59368],
]));
