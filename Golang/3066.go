package main

import (
	"container/heap"
	"fmt"
)

// MinHeap represents a min-heap using a slice
type MinHeap []int64

// Implement heap.Interface methods

// Len returns the number of elements in the heap
func (h MinHeap) Len() int {
	return len(h)
}

// Less defines the min-heap property (parent should be smaller than children)
func (h MinHeap) Less(i, j int) bool { return h[i] < h[j] }

// Swap swaps two elements in the heap
func (h MinHeap) Swap(i, j int) { h[i], h[j] = h[j], h[i] }

// Push adds an element to the heap
func (h *MinHeap) Push(x interface{}) {
	*h = append(*h, x.(int64))
}

// Pop removes and returns the smallest element
func (h *MinHeap) Pop() interface{} {
	old := *h
	n := len(old)
	smallest := old[0] // Get the root (smallest element)
	*h = old[1:n]      // Reduce heap size
	heap.Init(h)       // Re-heapify to maintain min-heap
	return smallest
}

func minOperations(nums []int, k int) int {
	newHeap := &MinHeap{}
	for i := range nums {
		*newHeap = append(*newHeap, int64(nums[i]))
	}
	heap.Init(newHeap)
	opCount := 0
	for {
		fmt.Println(newHeap)
		if newHeap.Len() <= 1 {
			fmt.Println(newHeap.Len())
			break
		}
		smallestElement := heap.Pop(newHeap).(int64)
		fmt.Println(newHeap, smallestElement)
		if smallestElement >= int64(k) {
			fmt.Println(newHeap, smallestElement)
			break
		}
		opCount++
		secondSmallestElement := heap.Pop(newHeap).(int64)
		fmt.Println(newHeap, secondSmallestElement)
		heap.Push(newHeap, smallestElement*2+secondSmallestElement)
	}
	return opCount
}
