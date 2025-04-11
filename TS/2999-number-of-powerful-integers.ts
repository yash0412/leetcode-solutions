function numberOfPowerfulInt(
  start: number,
  finish: number,
  limit: number,
  s: string
): number {
  let powerfulIntegersCount = 0;
  let lengthOfPrefix = 1;
  let maxPrefixVal = getMaxPrefixVal(limit, lengthOfPrefix);
  let prefix = 1;

  while (true) {
    if (prefix > maxPrefixVal) {
      lengthOfPrefix++;
      maxPrefixVal = getMaxPrefixVal(limit, lengthOfPrefix);
      prefix = 1;
    } else {
      break;
    }
  }

  return powerfulIntegersCount;
}

function getPrefix(limit: number, lengthOfPrefix: number): number {
  return 0;
}

function getMaxPrefixVal(limit: number, lengthOfPrefix: number): number {
  let maxPrefixVal = 0;
  for (let i = 0; i < lengthOfPrefix; i++) {
    maxPrefixVal += Math.pow(10, i) * limit;
  }

  return maxPrefixVal;
}
