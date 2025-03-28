interface HeapElement {
  value: number;
  coords: number[];
}

class MinHeap {
  private heap: HeapElement[];

  constructor() {
    this.heap = [];
  }

  // Get parent index
  private getParentIndex(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  // Get left child index
  private getLeftChildIndex(index: number): number {
    return 2 * index + 1;
  }

  // Get right child index
  private getRightChildIndex(index: number): number {
    return 2 * index + 2;
  }

  // Swap two elements in the heap
  private swap(index1: number, index2: number): void {
    [this.heap[index1], this.heap[index2]] = [
      this.heap[index2],
      this.heap[index1],
    ];
  }

  // Insert a new element into the heap
  insert(element: HeapElement): void {
    this.heap.push(element);
    this.heapifyUp();
  }

  // Move the element up to maintain heap order
  private heapifyUp(): void {
    let index = this.heap.length - 1;
    while (index > 0) {
      const parentIndex = this.getParentIndex(index);
      if (this.heap[parentIndex].value <= this.heap[index].value) {
        break;
      }
      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  // Extract and return the smallest element
  extractMin(): HeapElement | null {
    if (this.isEmpty()) {
      return null;
    }
    if (this.heap.length === 1) {
      return this.heap.pop()!;
    }
    const minValue = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.heapifyDown();
    return minValue;
  }

  // Move the element down to maintain heap order
  private heapifyDown(): void {
    let index = 0;
    while (true) {
      const leftChildIndex = this.getLeftChildIndex(index);
      const rightChildIndex = this.getRightChildIndex(index);
      let smallestIndex = index;

      if (
        leftChildIndex < this.heap.length &&
        this.heap[leftChildIndex].value < this.heap[smallestIndex].value
      ) {
        smallestIndex = leftChildIndex;
      }

      if (
        rightChildIndex < this.heap.length &&
        this.heap[rightChildIndex].value < this.heap[smallestIndex].value
      ) {
        smallestIndex = rightChildIndex;
      }

      if (smallestIndex === index) {
        break;
      }

      this.swap(index, smallestIndex);
      index = smallestIndex;
    }
  }

  // Peek at the smallest element without removing it
  peek(): HeapElement | null {
    return this.isEmpty() ? null : this.heap[0];
  }

  // Return the size of the heap
  size(): number {
    return this.heap.length;
  }

  // Check if the heap is empty
  isEmpty(): boolean {
    return this.heap.length === 0;
  }
}

interface QueryElem {
  query: number;
  originalIndex: number;
  answer: number;
}

function maxPoints(grid: number[][], queries: number[]): number[] {
  const sortedQueries: QueryElem[] = queries.map(
    (query, index) =>
      ({
        query: query,
        originalIndex: index,
        answer: 0,
      } as QueryElem)
  );
  sortedQueries.sort((a, b) => a.query - b.query);

  const visitedCells = new Set<string>();

  const cellsToVisit = new MinHeap();
  cellsToVisit.insert({ value: grid[0][0], coords: [0, 0] });
  for (let queryElem of sortedQueries) {
    queryElem.answer = findReachableCells(
      grid,
      queryElem.query,
      cellsToVisit,
      visitedCells
    );
  }

  const answers: number[] = new Array(queries.length);
  sortedQueries.forEach((queryElem) => {
    answers[queryElem.originalIndex] = queryElem.answer;
  });
  return answers;
}

function findReachableCells(
  grid: number[][],
  query: number,
  cellsToVisit: MinHeap,
  visitedCells: Set<string>
): number {
  while (cellsToVisit.size() > 0) {
    const currentCellPeek = cellsToVisit.peek();
    if (!currentCellPeek) {
      break;
    }
    if (currentCellPeek.value >= query) {
      break;
    }
    const currentCell = cellsToVisit.extractMin();
    if (!currentCell) {
      break;
    }

    const coordsAsString = coordsToString(currentCell.coords);
    if (visitedCells.has(coordsAsString)) {
      continue;
    }

    visitedCells.add(coordsAsString);

    getNeighbourCoords(currentCell.coords, grid[0].length, grid.length).forEach(
      (neighbour) => {
        if (!visitedCells.has(coordsToString(neighbour))) {
          cellsToVisit.insert({
            coords: neighbour,
            value: grid[neighbour[1]][neighbour[0]],
          });
        }
      }
    );
  }

  return visitedCells.size;
}

function getNeighbourCoords(
  [x, y]: number[],
  sizex: number,
  sizey: number
): number[][] {
  return [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
  ]
    .map(([dx, dy]) => [x + dx, y + dy])
    .filter(([newx, newy]) => isValidCoords(newx, newy, sizex, sizey));
}

function coordsToString([x, y]: number[]) {
  return `${x}-${y}`;
}

function isValidCoords(
  x: number,
  y: number,
  sizex: number,
  sizey: number
): boolean {
  if (x < 0) {
    return false;
  }

  if (x >= sizex) {
    return false;
  }

  if (y < 0) {
    return false;
  }

  if (y >= sizey) {
    return false;
  }

  return true;
}

console.log(
  maxPoints(
    [
      [1, 2, 3],
      [2, 5, 7],
      [3, 5, 1],
    ],
    [5, 6, 2]
  )
);
