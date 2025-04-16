package main

func countGood(nums []int, k int) int64 {
	goodSubarraysCount := int64(0)
	matchingPairsCount := 0
	countMap := make(map[int]int)

	start, end := 0, 0

	for start <= end && end < len(nums) {
		currentNum := nums[end]
		count := 0
		exists := false
		if count, exists = countMap[currentNum]; !exists {
			countMap[currentNum] = 0
		}
		matchingPairsCount += count
		countMap[currentNum]++
		if matchingPairsCount >= k {
			goodSubarraysCount += int64(len(nums) - end)
			for start < end {
				startNum := nums[start]
				startNumCount := countMap[startNum]
				countMap[startNum]--
				matchingPairsCount -= (startNumCount - 1)
				start++
				if matchingPairsCount >= k {
					goodSubarraysCount += int64(len(nums) - end)
				} else {
					break
				}
			}
		}
		end++
	}

	return goodSubarraysCount
}
