function addTwoLists(left, right) {
  if (left === undefined) { throw new Error('Left is Bad'); }
  if (right === undefined) { throw new Error('Right is Bad'); }

  let node = {};
  const start = node;
  let remainder = 0;
  let amount = 0;

  while (!!left || !!right) {
    amount = remainder;

    if (left) {
      amount += left.data;
      left = left.next;
    }
    if (right) {
      amount += right.data;
      right = right.next;
    }

    node.data = amount % 10;
    node.next = {};
    node = node.next;

    remainder = Math.floor(amount / 10);
  }

  if (remainder === 1) {
    node.data = 1;
    node.next = {};
  }

  return start;
}