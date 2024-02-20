function rectToBox(rect) {
  const top = rect.origin.y;
  const right = rect.origin.x + rect.size.width;
  const bottom = rect.origin.y + rect.size.height;
  const left = rect.origin.x;
  return [top, right, bottom, left];
}