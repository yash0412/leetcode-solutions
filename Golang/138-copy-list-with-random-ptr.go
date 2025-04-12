package main

/**
 * Definition for a Node.
 * type Node struct {
 *     Val int
 *     Next *Node
 *     Random *Node
 * }
 */

type Node struct {
	Val    int
	Next   *Node
	Random *Node
}

func NewNode(val int) *Node {
	return &Node{
		Val: val,
	}
}

func copyRandomList(head *Node) *Node {
	var newHead *Node
	var prevNode *Node
	newNodesMap := make(map[*Node]*Node)
	randomPtrMap := make(map[*Node]*Node)
	for root := head; root != nil; root = root.Next {
		newNode := NewNode(root.Val)
		if newHead == nil {
			newHead = newNode
		} else {
			prevNode.Next = newNode
		}
		randomPtrMap[newNode] = root.Random
		newNodesMap[root] = newNode
		prevNode = newNode
	}
	for root := newHead; root != nil; root = root.Next {
		if OGRandomNode, exists := randomPtrMap[root]; exists {
			root.Random = newNodesMap[OGRandomNode]
		} else {
			root.Random = nil
		}
	}

	return newHead
}
