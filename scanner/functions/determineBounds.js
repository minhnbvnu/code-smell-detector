function determineBounds(bounds) {
  let leftMost = Infinity;
  let bottomMost = -Infinity;
  let rightMost = -Infinity;
  let topMost = Infinity;

  for (const [left, bottom, right, top] of bounds) {
    leftMost = Math.min(leftMost, left);
    bottomMost = Math.max(bottomMost, bottom);
    rightMost = Math.max(rightMost, right);
    topMost = Math.min(topMost, top);
  }

  return [leftMost, bottomMost, rightMost, topMost];
}