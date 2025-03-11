const abcIndexMap: Record<string, number> = {
  a: 0,
  b: 1,
  c: 2,
};

const isAllCounted = (abcCounts: number[]) => {
  return abcCounts.every((abc) => abc > 0);
};

function numberOfSubstrings(s: string): number {
  let subStringCount = 0;
  const abcCounts = [0, 0, 0];
  let firstIndex = 0;
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    abcCounts[abcIndexMap[char]]++;
    if (isAllCounted(abcCounts)) {
      subStringCount += s.length - i;
      while (isAllCounted(abcCounts) && firstIndex < i) {
        const char2 = s[firstIndex];
        abcCounts[abcIndexMap[char2]]--;
        firstIndex++;
        if (isAllCounted(abcCounts)) {
          subStringCount += s.length - i;
        }
      }
    }
  }

  return subStringCount;
}

console.log(numberOfSubstrings('acbbcac'));
