package main

import (
	"fmt"
)

func threeSum(nums []int) [][]int {
	result := make([][]int, 0)
	resultMap := make(map[string]bool)
	for index := range nums {
		twoSumRes := twoSum(nums, index)
		for _, val := range twoSumRes {
			key := twoLargestElement(val)
			if _, exists := resultMap[key]; !exists {
				result = append(result, val)
				resultMap[key] = true
			}
		}

	}
	return result
}

func twoLargestElement(nums []int) string {
	smallestEl := 99999999
	smallestEIdx := 0
	for i := range nums {
		if nums[i] < smallestEl {
			smallestEl = nums[i]
			smallestEIdx = i
		}
	}
	largestTwo := [2]int{}
	elementsCount := 0
	for i := range nums {
		if i != smallestEIdx {
			largestTwo[elementsCount] = nums[i]
			elementsCount++
		}
	}
	if largestTwo[0] > largestTwo[1] {
		return fmt.Sprintf("%d|%d", largestTwo[1], largestTwo[0])
	} else {
		return fmt.Sprintf("%d|%d", largestTwo[0], largestTwo[1])
	}
}

func twoSum(nums []int, skipIndex int) [][]int {
	result := make([][]int, 0)
	expectedSum := -1 * nums[skipIndex]
	sumMap := make(map[int]int)
	for index, num := range nums {
		if index != skipIndex {
			if _, exists := sumMap[expectedSum-num]; exists {
				result = append(result, []int{-1 * expectedSum, expectedSum - num, num})
			} else {
				sumMap[num] = expectedSum - num
			}
		}
	}
	return result
}
