function minOperations2(grid: number[][], x: number): number {
  const flatGrid = grid.reduce((acc, curr) => {
    acc.push(...curr);
    return acc;
  }, [] as number[]);
  flatGrid.sort((a, b) => a - b);
  const mid = flatGrid[Math.floor(flatGrid.length / 2)];
  let minOps = 0;
  for (let i of flatGrid) {
    if ((mid - i) % x !== 0) {
      return -1;
    }
    let diff = (mid - i) / x;
    diff = diff < 0 ? -1 * diff : diff;
    console.log({ diff, mid, i });

    minOps += diff;
  }

  return minOps;
}
