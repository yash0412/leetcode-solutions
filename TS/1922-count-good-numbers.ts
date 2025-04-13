function countGoodNumbers(n: number): number {
  const modulo = 1e9 + 7;

  return (
    (fastExp(5, Math.floor((n + 1) / 2), modulo) *
      fastExp(4, Math.floor(n / 2), modulo)) %
    modulo
  );
}

function fastExp(base: number, exponent: number, mod: number): number {
  let res = 1;
  base = base % mod;

  while (exponent > 0) {
    if (exponent % 2 === 1) {
      res = (res * base) % mod;
    }
    base = (base * base) % mod;
    exponent = Math.floor(exponent / 2);
  }

  return res;
}

console.log(countGoodNumbers(1924));
