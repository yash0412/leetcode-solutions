package main

func countSubarrays2(nums []int, minK int, maxK int) int64 {
	inclusiveArr := make([][2]int, 0)
	start := -1
	subArrayCount := int64(0)
	for i := range nums {
		num := nums[i]
		if num < minK || num > maxK {
			if start != -1 {
				inclusiveArr = append(inclusiveArr, [2]int{start, i - 1})
				start = -1
			}
		} else {
			if start == -1 {
				start = i
			}
		}
	}
	if start != -1 {
		inclusiveArr = append(inclusiveArr, [2]int{start, len(nums) - 1})
	}

	for _, subArray := range inclusiveArr {
		subArrayCount += countFixedBoundSubarrays(nums[subArray[0]:subArray[1]+1], minK, maxK)
	}
	return subArrayCount
}

func countFixedBoundSubarrays(nums []int, minK, maxK int) int64 {
	start, end := 0, 0
	subArrayCount := int64(0)
	countMap := make(map[int]int)
	for start <= end && end < len(nums) {
		num := nums[end]
		countMap[num]++
		if countMap[minK] > 0 && countMap[maxK] > 0 {

			subArrayCount += int64(len(nums) - end)

			for start <= end {
				startNum := nums[start]
				countMap[startNum]--
				start++
				if countMap[minK] > 0 && countMap[maxK] > 0 {

					subArrayCount += int64(len(nums) - end)
				} else {
					break
				}
			}
		}
		end++
	}

	return subArrayCount
}
