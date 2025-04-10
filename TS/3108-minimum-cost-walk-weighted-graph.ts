const sets = Array<number>(1e5);

function root(x: number): number {
  if (sets[x] < 0) return x;
  return (sets[x] = root(sets[x]));
}

function union(x: number, y: number): void {
  x = root(x);
  y = root(y);
  if (x === y) return;

  if (sets[x] <= sets[y]) {
    sets[x] += sets[y];
    sets[y] = x;
  } else {
    sets[y] += sets[x];
    sets[x] = y;
  }
}

function minimumCost(
  n: number,
  edges: number[][],
  queries: number[][]
): number[] {
  sets.fill(-1, 0, n);

  for (const [u, v] of edges) {
    union(u, v);
  }

  const costs = Array<number>(n).fill(0xfffff);

  for (const [u, _, w] of edges) {
    costs[root(u)] &= w;
  }

  return queries.map(([u, v]) => {
    u = root(u);
    v = root(v);
    return u === v ? costs[u] : -1;
  });
}
console.log(
  minimumCost(
    5,
    [
      [0, 1, 7],
      [1, 3, 7],
      [1, 2, 1],
    ],
    [[0, 3]]
  )
);
