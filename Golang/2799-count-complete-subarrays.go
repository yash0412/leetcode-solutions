package main

func countCompleteSubarrays(nums []int) int {
	distinctNumbers := make(map[int]struct{})

	for _, num := range nums {
		distinctNumbers[num] = struct{}{}
	}

	start := 0
	end := 0
	completeSubarrayCount := 0
	currDistinctNumbers := make(map[int]int)

	for start <= end && end < len(nums) {
		num := nums[end]
		if _, exists := currDistinctNumbers[num]; !exists {
			currDistinctNumbers[num] = 1
		} else {
			currDistinctNumbers[num]++
		}
		if len(currDistinctNumbers) == len(distinctNumbers) {
			completeSubarrayCount += len(nums) - end
			for {
				startNum := nums[start]
				currDistinctNumbers[startNum]--
				start++
				if startNumCount := currDistinctNumbers[startNum]; startNumCount == 0 {
					delete(currDistinctNumbers, startNum)
				}
				if len(currDistinctNumbers) == len(distinctNumbers) {
					completeSubarrayCount += len(nums) - end
				} else {
					break
				}
			}
		}
		end++
	}

	return completeSubarrayCount
}
