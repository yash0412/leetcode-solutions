package main

import "fmt"

func countPairs2(nums []int, k int) int64 {
	pairsCount := int64(0)
	seenMap := make(map[int]int64)

	for i, num := range nums {
		if _, exists := seenMap[num]; !exists {
			seenMap[num] = 0
		}
		previousCount := seenMap[num]

		fmt.Println(previousCount, i)

		seenMap[num]++
	}

	return pairsCount
}
