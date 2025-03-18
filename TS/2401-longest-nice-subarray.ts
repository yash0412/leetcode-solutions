function longestNiceSubarray(nums: number[]): number {
  let used_bits = 0,
    start = 0,
    maxLength = 0;

  for (let i = 0; i < nums.length; i++) {
    while ((used_bits & nums[i]) !== 0) {
      used_bits ^= nums[start];
      start++;
    }

    used_bits |= nums[i];

    maxLength = maxLength < i - start + 1 ? i - start + 1 : maxLength;
  }

  return maxLength;
}

console.log(
  longestNiceSubarray([
    45106826, 547958667, 823366125, 332020148, 611677524, 510346561, 555831456,
    436600904, 12594192, 127206768, 540754485, 201997978, 473116514, 233000361,
    538246458, 729745279, 343417143, 892046691, 376031730,
  ])
);
