package main

import "fmt"

type LRUCacheElement struct {
	key   int
	value int
	prev  *LRUCacheElement
	next  *LRUCacheElement
}

type LRUCache struct {
	Capacity             int
	CacheElemMap         map[int]*LRUCacheElement
	CacheStart, CacheEnd *LRUCacheElement
}

func Constructor(capacity int) LRUCache {
	return LRUCache{
		Capacity:     capacity,
		CacheElemMap: make(map[int]*LRUCacheElement),
		CacheStart:   nil,
		CacheEnd:     nil,
	}
}

func (lru *LRUCache) Get(key int) int {
	if _, exists := lru.CacheElemMap[key]; !exists {
		return -1
	}

	if lru.CacheElemMap[key].next != nil {
		lru.CacheElemMap[key].next.prev = lru.CacheElemMap[key].prev
	}

	if lru.CacheElemMap[key].prev != nil {
		lru.CacheElemMap[key].prev.next = lru.CacheElemMap[key].next
		lru.CacheElemMap[key].prev = nil
		lru.CacheElemMap[key].next = lru.CacheStart
		lru.CacheStart = lru.CacheElemMap[key]
	}
	fmt.Println(lru.CacheElemMap)
	return lru.CacheElemMap[key].value
}

func (lru *LRUCache) Put(key int, value int) {
	if _, exists := lru.CacheElemMap[key]; exists {
		lru.CacheElemMap[key].value = value
		return
	}
	if len(lru.CacheElemMap) == lru.Capacity {
		delete(lru.CacheElemMap, lru.CacheEnd.key)
		lru.CacheEnd.prev = nil
		lru.CacheEnd = lru.CacheEnd.prev
	}
	cacheElem := LRUCacheElement{
		key:   key,
		value: value,
		prev:  nil,
		next:  nil,
	}

	cacheElem.next = lru.CacheStart
	lru.CacheStart = &cacheElem
	lru.CacheElemMap[key] = &cacheElem
	if len(lru.CacheElemMap) == 1 {
		lru.CacheEnd = &cacheElem
	}
}
