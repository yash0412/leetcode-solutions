class MinHeapClass {
  private heap: Coords[] = [];

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
        this.heap[this.getRightChildIndex(index)].cost <
          this.heap[smallerChildIndex].cost
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
      if (this.heap[parentIndex].cost > this.heap[index].cost) {
        this.swap(index, parentIndex);
      }
      index = parentIndex;
    }
  }

  public peek(): Coords | undefined {
    if (this.heap.length > 0) {
      return this.heap[0];
    }

    return undefined;
  }

  public pop(): Coords | undefined {
    const item = this.peek();
    if (item === undefined) {
      return undefined;
    }
    this.heap[0] = this.heap[this.heap.length - 1];
    this.heap.length--;
    this.heapifyDown();
    return item;
  }

  public insert(val: Coords): void {
    this.heap.push(val);
    this.heapifyUp();
    console.log(this.heap);
  }

  public get size(): number {
    return this.heap.length;
  }
}

interface Coords {
  x: number;
  y: number;
  cost: number;
}

function minTimeToReach(moveTime: number[][]): number {
  const heap = new MinHeapClass();
  heap.insert({ cost: 0, x: 0, y: 0 });
  const xSize = moveTime.length;
  const ySize = moveTime[0].length;
  const seen: boolean[][] = Array.from({ length: xSize }, () => Array(ySize));
  const d: number[][] = Array.from({ length: xSize }, () =>
    Array(ySize).fill(Infinity)
  );
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
        const newElem: Coords = {
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

function subtract(a: number, b: number) {
  const diff = a - b;
  return diff < 0 ? 0 : diff;
}

function getNeighbourCoords2(coord: Coords, xSize: number, ySize: number) {
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

console.log(
  minTimeToReach([
    [96, 15, 101, 24, 36, 105, 11, 13, 30],
    [77, 50, 63, 101, 55, 56, 50, 15, 84],
    [15, 34, 118, 80, 94, 19, 9, 23, 40],
    [30, 29, 81, 117, 66, 88, 106, 90, 30],
    [78, 19, 5, 16, 94, 69, 99, 103, 8],
    [108, 82, 107, 64, 85, 57, 107, 44, 12],
    [37, 43, 72, 51, 72, 117, 57, 117, 47],
    [109, 5, 78, 11, 94, 36, 81, 42, 44],
  ])
);
