package main

func countPairs(nums []int, k int) int {
	pairsCount := 0
	seenMap := make(map[int][]int)

	for i, num := range nums {
		if _, exists := seenMap[num]; !exists {
			seenMap[num] = make([]int, 0)
		}
		previousIndices := seenMap[num]
		for _, index := range previousIndices {
			if i*index%k == 0 {
				pairsCount++
			}
		}
		seenMap[num] = append(seenMap[num], i)
	}

	return pairsCount
}
