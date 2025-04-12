package main

import (
	"fmt"
	"math"
	"strconv"
)

var factorialMap map[int64]int64

func countGoodIntegers(n int, k int) int64 {
	palindrome := allPalindromesWithNDigits(n)
	goodIntegersCount := int64(0)
	factorialMap = make(map[int64]int64)
	factorialMap[0] = 1
	factorialMap[1] = 1
	visitedCombination := make(map[string]struct{})

	for i := range palindrome {
		palindromeInt, _ := strconv.Atoi(palindrome[i])
		if palindromeInt%k == 0 {
			digitsCounts := digitsCountInString(palindrome[i])
			digitCountsStr := getStringForDigitsCount(digitsCounts)
			if _, exists := visitedCombination[digitCountsStr]; exists {
				continue
			}
			visitedCombination[digitCountsStr] = struct{}{}
			allCombinations := findCombination(len(palindrome[i]), digitsCounts)
			allCombinationsWithoutZero := int64(0)
			if _, exists := digitsCounts['0']; exists {
				digitsCounts['0']--
				allCombinationsWithoutZero = findCombination(len(palindrome[i])-1, digitsCounts)
			}
			goodIntegersCount += allCombinations - allCombinationsWithoutZero
		}
	}
	return goodIntegersCount
}

func getStringForDigitsCount(digitsCounts map[rune]int) string {
	result := ""
	for _, char := range []rune{'0', '1', '2', '3', '4', '5', '6', '7', '8', '9'} {
		if count, exists := digitsCounts[char]; exists && count > 0 {
			result += fmt.Sprintf("%U:%d,", char, count)
		}
	}
	return result
}

func findCombination(digitsCount int, digitsCounts map[rune]int) int64 {
	if digitsCount == 0 {
		return 0
	}
	numerator := factorial(int64(digitsCount))
	denomintor := int64(1)
	for k := range digitsCounts {
		denomintor *= factorial(int64(digitsCounts[k]))
	}

	return numerator / denomintor
}

func factorial(n int64) int64 {
	if fac, exists := factorialMap[n]; exists {
		return fac
	}
	fac := n * factorial(n-1)
	factorialMap[n] = fac
	return fac
}

func digitsCountInString(s string) map[rune]int {
	digitsCountMap := make(map[rune]int)
	for _, char := range s {
		if _, exists := digitsCountMap[char]; !exists {
			digitsCountMap[char] = 0
		}
		digitsCountMap[char]++
	}
	if _, exists := digitsCountMap[0]; exists {
		digitsCountMap[0]--
	}
	return digitsCountMap
}

func allPalindromesWithNDigits(n int) []string {
	var palindromes []string
	halfLen := (n + 1) / 2 // Half length (round up for odd lengths)

	start := 1
	if halfLen > 1 {
		start = int(math.Pow10(halfLen - 1)) // To avoid leading zeros
	}
	end := int(math.Pow10(halfLen))

	for i := start; i < end; i++ {
		half := strconv.Itoa(i)
		var full string
		if n%2 == 0 {
			full = half + reverseString(half)
		} else {
			full = half + reverseString(half[:len(half)-1])
		}
		palindromes = append(palindromes, full)
	}
	return palindromes
}

func reverseString(s string) string {
	runes := []rune(s)
	for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
		runes[i], runes[j] = runes[j], runes[i]
	}
	return string(runes)
}
