package main

func countSubarrays(nums []int, k int64) int64 {
	start := 0
	end := 0
	subArrayCount := int64(0)
	currentSum := int64(0)

	for end < len(nums) {
		num := int64(nums[end])
		currentSum += num

		if currentSum*int64(end-start+1) < k {
			subArrayCount += int64(end - start + 1)
		} else {
			for start <= end {
				startNum := int64(nums[start])
				currentSum -= startNum
				start++
				if currentSum*int64(end-start+1) < k {
					subArrayCount += int64(end - start + 1)
					break
				}
			}
		}

		end++
	}

	return subArrayCount
}
