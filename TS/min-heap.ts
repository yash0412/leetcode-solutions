class MinHeapClass2 {
  private heap: number[] = [];

  private getParentIndex(index: number) {
    return Math.floor((index - 1) / 2);
  }

  private hasParent(index: number) {
    return this.getParentIndex(index) >= 0;
  }

  private getLeftChildIndex(index: number) {
    return index * 2 + 1;
  }

  private hasLeftChild(index: number) {
    return this.getLeftChildIndex(index) < this.heap.length;
  }

  private getRightChildIndex(index: number) {
    return index * 2 + 2;
  }

  private hasRightChild(index: number) {
    return this.getRightChildIndex(index) < this.heap.length;
  }

  private swap(index1: number, index2: number) {
    const temp = this.heap[index1];
    this.heap[index1] = this.heap[index2];
    this.heap[index2] = temp;
  }

  private heapifyDown() {
    let index = 0;

    while (this.hasLeftChild(index)) {
      let smallerChildIndex = this.getLeftChildIndex(index);
      if (
        this.hasRightChild(index) &&
        this.heap[this.getRightChildIndex(index)] < this.heap[smallerChildIndex]
      ) {
        smallerChildIndex = this.getRightChildIndex(index);
      }
      if (this.heap[index] < this.heap[smallerChildIndex]) {
        break;
      } else {
        this.swap(index, smallerChildIndex);
      }
      index = smallerChildIndex;
    }
  }

  private heapifyUp() {
    let index = this.heap.length - 1;
    while (this.hasParent(index)) {
      const parentIndex = this.getParentIndex(index);
      if (this.heap[parentIndex] > this.heap[index]) {
        this.swap(index, parentIndex);
      }
      index = parentIndex;
    }
  }

  public peek(): number | undefined {
    if (this.heap.length > 0) {
      return this.heap[0];
    }

    return undefined;
  }

  public pop(): number | undefined {
    const item = this.peek();
    if (item === undefined) {
      return undefined;
    }
    this.heap[0] = this.heap[this.heap.length - 1];
    this.heap.length--;
    this.heapifyDown();
    return item;
  }

  public insert(val: number): void {
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
