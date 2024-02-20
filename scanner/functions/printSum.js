function printSum(tree, sum, print) {
  if (tree === null) {
    return false;
  }
  if (!(print instanceof Function)) {
    throw new Error('Bad print function');
  }
  if (sum < 1) {
    return false;
  }

  const totalSum = 0;

  function processQueue(total, sumQueue) {
    while (total > sum) {
      const fromQueue = sumQueue.shift();
      total -= fromQueue;
    }
    if (total === sum) {
      print(sumQueue);
    }
  }

  function findSum(node, total, sumQueue) {
    if (node === null) { return; }
    const value = node.data;

    if (value > sum) {
      sumQueue = [];
      total = 0;
    } else {
      total += value;
      sumQueue.push(value);
      processQueue(total, sumQueue);
    }

    findSum(node.left, total, sumQueue.slice(0));
    findSum(node.right, total, sumQueue.slice(0));
  }

  findSum(tree.head, totalSum, []);

  return totalSum;
}