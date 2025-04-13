package main

const mod = 1e9 + 7

func countGoodNumbers(n int64) int {
	return int((fastExp(5, (n+1)/2) * fastExp(4, n/2)) % mod)
}

func fastExp(base, exponent int64) int {
	res := 1
	b := int(base)
	e := exponent
	b %= mod

	for e > 0 {
		if e%2 == 1 {
			res = (res * b) % mod
		}
		b = (b * b) % mod
		e /= 2
	}

	return res
}
