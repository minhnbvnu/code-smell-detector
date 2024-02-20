function intersectionOfRects(rect1, rect2) {
  const [top1, right1, bottom1, left1] = rectToBox(rect1);
  const [top2, right2, bottom2, left2] = rectToBox(rect2);
  return boxToRect([Math.max(top1, top2), Math.min(right1, right2), Math.min(bottom1, bottom2), Math.max(left1, left2)]);
}