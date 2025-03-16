function repairCars(ranks: number[], cars: number): number {
  const worstTime = findMin(ranks) * cars * cars;

  let left = 0,
    right = worstTime,
    result = worstTime;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (checkIfTimePossible(ranks, cars, mid)) {
      result = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return result;
}

function findMin(ranks: number[]): number {
  let min = 99999999999;
  ranks.forEach((rank) => {
    if (rank < min) {
      min = rank;
    }
  });

  return min;
}

function checkIfTimePossible(
  ranks: number[],
  cars: number,
  time: number
): boolean {
  let ranksIndex = 0;
  while (ranksIndex < ranks.length) {
    const currentRank = ranks[ranksIndex];
    let possibleCarsCount = Math.floor(Math.sqrt(time / currentRank));
    possibleCarsCount > cars ? (cars = 0) : (cars -= possibleCarsCount);
    if (cars === 0) {
      return true;
    }
    ranksIndex++;
  }
  return false;
}

console.log(repairCars([4, 2, 3, 1], 10));
