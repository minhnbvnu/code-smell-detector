function getOrderedChildren(node) {
  var queue = [];
  for (var key in node) {
    if (node.hasOwnProperty(key)) {
      enqueueNodeWithStartIndex(queue, node[key]);
    }
  }
  queue.sort(function(a, b) { return a[1] - b[1]; });
  return queue.map(function(pair) { return pair[0]; });
}