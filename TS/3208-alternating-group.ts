function numberOfAlternatingGroups(colors: number[], k: number): number {
  let alternatingCount = 0;
  let elementsCounted = 0;
  let lastVal = -1;
  let isAlternating = false;
  for (let ind = 0; ind < colors.length + k; ind++) {
    const i = ind % colors.length;

    if (elementsCounted < k) {
      if (colors[i] !== lastVal) {
        lastVal = colors[i];
        elementsCounted++;
      } else {
        isAlternating = false;
        lastVal = colors[i];
        elementsCounted = 0;
      }
    } else {
      isAlternating = true;
      alternatingCount++;
      if (colors[i] === lastVal) {
        isAlternating = false;
        lastVal = colors[i];
        elementsCounted = 0;
      }
    }
    console.log({ elementsCounted, i, ind, alternatingCount, lastVal });
  }

  return alternatingCount;
}

function checkIfAlternating(
  colors: number[],
  startIndex: number,
  k: number
): boolean {
  let lastVal = -1;
  for (let i = startIndex; i < startIndex + k; i++) {
    const elementIndex = i % colors.length;
    if (colors[elementIndex] !== lastVal) {
      lastVal = colors[elementIndex];
    } else {
      return false;
    }
  }
  return true;
}

console.log(numberOfAlternatingGroups([0, 1, 0, 1], 3));
