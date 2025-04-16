package main

type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func distanceK(root *TreeNode, target *TreeNode, k int) []int {
	nodeParentMap := make(map[*TreeNode]*TreeNode)

	bfsQueue := []*TreeNode{}
	bfsQueue = append(bfsQueue, root)
	for len(bfsQueue) > 0 {
		current := bfsQueue[0]
		bfsQueue = bfsQueue[1:]
		if current.Left != nil {
			nodeParentMap[current.Left] = current
			bfsQueue = append(bfsQueue, current.Left)
		}
		if current.Right != nil {
			nodeParentMap[current.Right] = current
			bfsQueue = append(bfsQueue, current.Right)
		}
	}

	result := make([]int, 0)
	visitedMap := make(map[int]struct{})
	level := 0
	bfsQueue = append(bfsQueue, target)
	for len(bfsQueue) > 0 {
		queueSize := len(bfsQueue)
		for range queueSize {
			current := bfsQueue[0]
			bfsQueue = bfsQueue[1:]
			if _, exists := visitedMap[current.Val]; exists {
				continue
			}
			visitedMap[current.Val] = struct{}{}
			if level < k {
				if _, exists := nodeParentMap[current]; exists {
					bfsQueue = append(bfsQueue, nodeParentMap[current])
				}
				if current.Left != nil {
					bfsQueue = append(bfsQueue, current.Left)
				}
				if current.Right != nil {
					bfsQueue = append(bfsQueue, current.Right)
				}
			}
			if level == k {
				result = append(result, current.Val)
			}
		}
		level++
	}

	return result
}
