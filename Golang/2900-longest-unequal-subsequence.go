package main

func getLongestSubsequence(words []string, groups []int) []string {
	lastGroup := -1
	subsequence := make([]string, 0)

	for index := range words {
		word := words[index]
		group := groups[index]
		if group != lastGroup {
			subsequence = append(subsequence, word)
			lastGroup = group
		}
	}

	return subsequence
}
