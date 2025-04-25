package main

func countInterestingSubarrays(nums []int, modulo int, k int) int64 {
	interestingSubArrays := int64(0)
	countMap := make(map[int]int)
	countMap[0] = 1
	prefix := 0
	for _, num := range nums {
		if num%modulo == k {
			prefix++
		}
		requiredCount := (prefix + modulo - k) % modulo
		interestingSubArrays += int64(countMap[requiredCount])
		countMap[prefix%modulo] += 1
	}

	return interestingSubArrays
}
