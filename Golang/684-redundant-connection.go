package main

import (
	"strconv"
	"strings"
)

func findRedundantConnection(edges [][]int) []int {
	edgeMap := make(map[int]map[int]bool)
	for _, edge := range edges {
		if _, exists := edgeMap[edge[0]]; !exists {
			edgeMap[edge[0]] = make(map[int]bool)
		}
		edgeMap[edge[0]][edge[1]] = true
		if _, exists := edgeMap[edge[1]]; !exists {
			edgeMap[edge[1]] = make(map[int]bool)
		}
		edgeMap[edge[1]][edge[0]] = true
	}
	for i := len(edges) - 1; i >= 0; i-- {
		edge := edges[i]
		edgeMap[edge[0]][edge[1]] = false
		edgeMap[edge[1]][edge[0]] = false
		if findPathBetweenVertices(edgeMap, edge) {
			return edge
		}
		edgeMap[edge[0]][edge[1]] = true
		edgeMap[edge[1]][edge[0]] = true
	}
	return []int{}
}

func findPathBetweenVertices(edgeMap map[int]map[int]bool, edge []int) bool {
	visited := make(map[int]bool)
	stack := []int{edge[0]}
	for len(stack) > 0 {
		vertex := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		if _, exists := visited[vertex]; exists {
			continue
		}
		visited[vertex] = true
		for neighbor, exists := range edgeMap[vertex] {
			if exists {
				if neighbor == edge[1] {
					return true
				}
				stack = append(stack, neighbor)
			}
		}
	}

	return false
}

func edgeToString(edge []int) string {
	return strings.Join(intArrToStrArr(edge), "-")
}

func intArrToStrArr(inp []int) []string {
	out := []string{}
	for i := range inp {
		out = append(out, strconv.Itoa(inp[i]))
	}
	return out
}
