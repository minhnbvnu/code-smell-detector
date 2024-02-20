function rectIntersectsRect(rect1, rect2) {
  if (rect1.size.width === 0 || rect1.size.height === 0 || rect2.size.width === 0 || rect2.size.height === 0) {
    return false;
  }

  const [top1, right1, bottom1, left1] = rectToBox(rect1);
  const [top2, right2, bottom2, left2] = rectToBox(rect2);
  return !(right1 < left2 || right2 < left1 || bottom1 < top2 || bottom2 < top1);
}