function palindrome(head) {
  const myStack = new Stack();
  let slow = head;
  let fast = head;

  while ((fast !== null) && (fast.next !== null)) {
    myStack.push(slow.data);
    slow = slow.next;
    fast = fast.next.next;
  }

  // this case covers an odd-numbered list
  if (fast !== null) {
    slow = slow.next;
  }

  while (slow !== null) {
    if (slow.data !== myStack.pop()) {
      return false;
    }
    slow = slow.next;
  }

  return true;
}