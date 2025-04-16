package main

import "fmt"

func orangesRotting(grid [][]int) int {
	orangeDistanceMap := make(map[[2]int]int)
	rottenOrangesPos := [][2]int{}
	goodOrangesCount := 0
	for i := range grid {
		for j, orange := range grid[i] {
			if orange == 2 {
				rottenOrangesPos = append(rottenOrangesPos, [2]int{i, j})
			} else if orange == 1 {
				goodOrangesCount++
			}
		}
	}

	fmt.Println(rottenOrangesPos, goodOrangesCount)

	for _, orangePos := range rottenOrangesPos {
		bfsQueue := [][2]int{orangePos}
		visitedMap := make(map[[2]int]struct{})
		depth := 0
		for len(bfsQueue) > 0 {
			queueSize := len(bfsQueue)
			for range queueSize {
				current := bfsQueue[0]
				bfsQueue = bfsQueue[1:]
				if _, exists := visitedMap[current]; exists {
					continue
				}
				visitedMap[current] = struct{}{}
				if distance, exists := orangeDistanceMap[current]; exists {
					if depth < distance {
						orangeDistanceMap[current] = depth
					}
				} else {
					orangeDistanceMap[current] = depth
				}
				neighbours := getAllValidSides(current, len(grid), len(grid[0]))
				for _, neighbour := range neighbours {
					if grid[neighbour[0]][neighbour[1]] == 1 {
						bfsQueue = append(bfsQueue, neighbour)
					}
				}
			}
			depth++
		}
		delete(orangeDistanceMap, orangePos)
	}

	fmt.Println(orangeDistanceMap)

	if goodOrangesCount > len(orangeDistanceMap) {
		return -1
	}

	maxDepth := 0
	for _, depth := range orangeDistanceMap {
		if depth > maxDepth {
			maxDepth = depth
		}
	}

	return maxDepth
}

func getAllValidSides(current [2]int, rows, columns int) [][2]int {
	dirCoords := [][2]int{
		{-1, 0},
		{0, -1},
		{1, 0},
		{0, 1},
	}
	validCoords := [][2]int{}

	for _, coord := range dirCoords {
		newCoordI := current[0] + coord[0]
		newCoordJ := current[1] + coord[1]
		if newCoordI >= 0 && newCoordI < rows && newCoordJ >= 0 && newCoordJ < columns {
			validCoords = append(validCoords, [2]int{newCoordI, newCoordJ})
		}
	}

	return validCoords
}
