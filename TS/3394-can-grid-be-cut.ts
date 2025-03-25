function checkValidCuts(n: number, rectangles: number[][]): boolean {
  rectangles.sort((a, b) => a[0] - b[0]);
  let noOverlapCount = 0;
  let currentCoords = 0;
  for (let [startx, starty, endx, endy] of rectangles) {
    if (currentCoords) {
      if (currentCoords <= startx) {
        noOverlapCount++;
      }
    }
    if (noOverlapCount >= 2) {
      return true;
    }
    if (currentCoords < endx) {
      currentCoords = endx;
    }
  }
  rectangles.sort((a, b) => a[1] - b[1]);
  noOverlapCount = 0;
  currentCoords = 0;
  for (let [startx, starty, endx, endy] of rectangles) {
    if (currentCoords) {
      if (currentCoords <= starty) {
        noOverlapCount++;
      }
    }
    if (noOverlapCount >= 2) {
      return true;
    }
    if (currentCoords < endy) {
      currentCoords = endy;
    }
  }

  return false;
}

console.log(
  checkValidCuts(5, [
    [1, 0, 5, 2],
    [0, 2, 2, 4],
    [3, 2, 5, 3],
    [0, 4, 4, 5],
  ])
);
