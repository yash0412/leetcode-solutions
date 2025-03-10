/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function mergeTwoLists(
  list1: ListNode | null,
  list2: ListNode | null
): ListNode | null {
  let list1Curr = list1;
  let list2Curr = list2;
  let newListRoot: ListNode | null = null;
  let newListCurr: ListNode | null = newListRoot;

  while (list1Curr || list2Curr) {
    const newNode = new ListNode();
    if (list1Curr && list2Curr) {
      if (list1Curr.val < list2Curr.val) {
        newNode.val = list1Curr.val;
        list1Curr = list1Curr.next;
      } else {
        newNode.val = list2Curr.val;
        list2Curr = list2Curr.next;
      }
    } else if (list1Curr) {
      newNode.val = list1Curr.val;
      list1Curr = list1Curr.next;
    } else if (list2Curr) {
      newNode.val = list2Curr.val;
      list2Curr = list2Curr.next;
    }

    if (!newListRoot) {
      newListRoot = newNode;
    }

    if (newListCurr) {
      newListCurr.next = newNode;
    }
    newListCurr = newNode;
  }

  return newListRoot;
}
