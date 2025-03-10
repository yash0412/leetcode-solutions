package main

import "fmt"

func lengthOfLongestSubstring(s string) int {
	maxFoundLength := 0
	currentWindowCharactersMap := make(map[rune]int)
	currentLength := 0
	for index, char := range s {
		if charIndex, exists := currentWindowCharactersMap[char]; exists {
			for mapChar, mapCharIndex := range currentWindowCharactersMap {
				if mapCharIndex <= charIndex {
					delete(currentWindowCharactersMap, mapChar)
				}
			}
			if maxFoundLength < currentLength {
				maxFoundLength = currentLength
			}
			currentLength = len(currentWindowCharactersMap)
		}
		currentWindowCharactersMap[char] = index
		currentLength++
		if maxFoundLength < currentLength {
			maxFoundLength = currentLength
		}
		fmt.Println(currentWindowCharactersMap, maxFoundLength, currentLength)
	}
	return maxFoundLength
}
