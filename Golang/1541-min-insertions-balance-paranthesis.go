package main

import "fmt"

type Stack struct {
	Elements []rune
}

func (s *Stack) Push(val rune) {
	s.Elements = append(s.Elements, val)
}

func (s *Stack) Pop() rune {
	if len(s.Elements) > 0 {
		top := s.Elements[len(s.Elements)-1]
		s.Elements = s.Elements[:len(s.Elements)-1]
		return top
	}
	panic("empty stack")
}

func (s *Stack) Size() int {
	return len(s.Elements)
}

func (s *Stack) Peek() rune {
	if len(s.Elements) > 0 {
		return s.Elements[len(s.Elements)-1]
	}
	panic("empty stack")
}

func TestStack() {
	stack := Stack{}
	stack.Push('q')
	stack.Push('w')
	stack.Push('e')
	stack.Push('r')
	fmt.Println(stack.Peek())
	fmt.Println(stack.Pop())
	fmt.Println(stack.Size())
	fmt.Println(stack.Peek())
	fmt.Println(stack.Pop())
	fmt.Println(stack.Size())
	fmt.Println(stack.Peek())
	fmt.Println(stack.Pop())
	fmt.Println(stack.Size())
	fmt.Println(stack.Peek())
	fmt.Println(stack.Pop())
	fmt.Println(stack.Size())
}
