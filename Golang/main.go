package main

import "fmt"

func main() {
	// fmt.Println(minOperations([]int{1, 1, 2, 4, 9}, 20))
	// lRUCache := Constructor(2)
	// lRUCache.Put(1, 1)           // cache is {1=1}
	// lRUCache.Put(2, 2)           // cache is {1=1, 2=2}
	// fmt.Println(lRUCache.Get(1)) // return 1
	// lRUCache.Put(3, 3)           // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
	// fmt.Println(lRUCache.Get(2)) // returns -1 (not found)
	// lRUCache.Put(4, 4)           // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
	// fmt.Println(lRUCache.Get(1)) // return -1 (not found)
	// fmt.Println(lRUCache.Get(3)) // return 3
	// fmt.Println(lRUCache.Get(4)) // return 4

	// fmt.Println(countGoodIntegers(5, 6))
	// fmt.Println(countGoodNumbers(1924))

	// fmt.Println(countGood([]int{1, 1, 1, 1, 1}, 10))

	// fmt.Println(orangesRotting([][]int{
	// 	{0, 2},
	// }))

	// fmt.Println(countPairs([]int{3, 1, 2, 2, 2, 1, 3}, 2))
	// fmt.Println(countCompleteSubarrays([]int{5, 5, 5, 5}))
	// fmt.Println(countInterestingSubarrays([]int{3, 1, 9, 6}, 3, 0))
	// fmt.Println(countSubarrays([]int{1, 1, 1, 1}, 1, 1))
	// fmt.Println(countSubarrays([]int{2, 1, 4, 3, 5}, 10))
	// TestStack()
	fmt.Println(getLongestSubsequence([]string{"e", "a", "b"}, []int{0, 0, 1}))
}
