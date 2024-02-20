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