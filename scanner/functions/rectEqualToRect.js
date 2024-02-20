function rectEqualToRect(rect1, rect2) {
  return pointEqualToPoint(rect1.origin, rect2.origin) && sizeEqualToSize(rect1.size, rect2.size);
}