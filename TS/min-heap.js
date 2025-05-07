"use strict";
class MinHeapClass2 {
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
                this.heap[this.getRightChildIndex(index)] < this.heap[smallerChildIndex]) {
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
            if (this.heap[parentIndex] > this.heap[index]) {
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
    }
}
function TestMinHeap() {
    const minHeap = new MinHeapClass2();
    console.log(minHeap.peek());
    console.log(minHeap.pop());
    console.log(minHeap.insert(1));
    console.log(minHeap.insert(2));
    console.log(minHeap.insert(55));
    console.log(minHeap.insert(3));
    console.log(minHeap.peek());
    console.log(minHeap.pop());
    console.log(minHeap.peek());
    console.log(minHeap.pop());
    console.log(minHeap.insert(0.5));
    console.log(minHeap.peek());
    console.log(minHeap.pop());
    console.log(minHeap.peek());
    console.log(minHeap.pop());
}
TestMinHeap();
