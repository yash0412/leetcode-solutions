interface VowelCountMapEntry {
  count: number;
}

type VowelCountMapType = Record<string, VowelCountMapEntry>;

const areAllVowelsCounted = (vowelCountMap: VowelCountMapType): boolean => {
  return Object.keys(vowelCountMap).every(
    (vowel) => vowelCountMap[vowel].count > 0
  );
};

const resetVowelsCount = (vowelCountMap: VowelCountMapType) => {
  Object.keys(vowelCountMap).forEach((vowel) => {
    vowelCountMap[vowel].count = 0;
  });
};

function isVowel(vowelCountMap: VowelCountMapType, char: string): boolean {
  if (vowelCountMap[char]) {
    return true;
  }

  return false;
}

function countOfSubstrings(word: string, k: number): number {
  let substringCount = 0;
  let consonantCount = 0;
  let firstIndex = 0;
  const vowelCountMap: VowelCountMapType = {
    a: { count: 0 },
    e: { count: 0 },
    i: { count: 0 },
    o: { count: 0 },
    u: { count: 0 },
  };

  for (let i = 0; i < word.length; i++) {
    const char = word[i];
    if (isVowel(vowelCountMap, char)) {
      vowelCountMap[char].count++;
    } else {
      consonantCount++;
    }
    if (consonantCount === k && areAllVowelsCounted(vowelCountMap)) {
      substringCount++;
      let checkFirst = firstIndex;
      while (true) {
        const vowelCountMapCopy: VowelCountMapType = {
          a: { count: vowelCountMap.a.count },
          e: { count: vowelCountMap.e.count },
          i: { count: vowelCountMap.i.count },
          o: { count: vowelCountMap.o.count },
          u: { count: vowelCountMap.u.count },
        };
        const char3 = word[checkFirst];
        if (vowelCountMapCopy[char3]?.count > 1) {
          vowelCountMapCopy[char3].count--;
          substringCount++;
        } else {
          break;
        }
        checkFirst++;
      }
    } else if (consonantCount > k) {
      while (consonantCount > k) {
        const char2 = word[firstIndex];
        if (isVowel(vowelCountMap, char2)) {
          vowelCountMap[char2].count--;
        } else {
          consonantCount--;
        }
        firstIndex++;
      }
      if (consonantCount === k && areAllVowelsCounted(vowelCountMap)) {
        substringCount++;
        let checkFirst = firstIndex;
        while (true) {
          const vowelCountMapCopy: VowelCountMapType = {
            a: { count: vowelCountMap.a.count },
            e: { count: vowelCountMap.e.count },
            i: { count: vowelCountMap.i.count },
            o: { count: vowelCountMap.o.count },
            u: { count: vowelCountMap.u.count },
          };
          const char3 = word[checkFirst];
          if (vowelCountMapCopy[char3]?.count > 1) {
            vowelCountMapCopy[char3].count--;
            substringCount++;
          } else {
            break;
          }
          checkFirst++;
        }
      }
    }
  }
  console.log(substringCount);

  while (consonantCount === k && firstIndex < word.length) {
    const char = word[firstIndex];
    if (isVowel(vowelCountMap, char)) {
      vowelCountMap[char].count--;
    } else {
      consonantCount--;
    }

    if (consonantCount === k && areAllVowelsCounted(vowelCountMap)) {
      substringCount++;
      let checkFirst = firstIndex;

      while (true) {
        const vowelCountMapCopy: VowelCountMapType = {
          a: { count: vowelCountMap.a.count },
          e: { count: vowelCountMap.e.count },
          i: { count: vowelCountMap.i.count },
          o: { count: vowelCountMap.o.count },
          u: { count: vowelCountMap.u.count },
        };
        const char3 = word[checkFirst];
        if (vowelCountMapCopy[char3]?.count > 1) {
          vowelCountMapCopy[char3].count--;
          substringCount++;
        } else {
          break;
        }
        checkFirst++;
      }
    }
    firstIndex++;
  }

  return substringCount;
}

console.log(countOfSubstrings('aeeieoua', 0));
