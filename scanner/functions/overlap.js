function overlap(rect1, rect2) {
  const overlapX = Math.min(rect1.right - rect2.left, rect2.right - rect1.left);
  const overlapY = Math.min(rect1.bottom - rect2.top, rect2.bottom - rect1.top);

  if (overlapX < 0 || overlapY < 0) {
    return 0;
  }
  return overlapX * overlapY;
}