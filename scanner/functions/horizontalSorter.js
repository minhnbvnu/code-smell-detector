function horizontalSorter( a, b ) {
  return a.position.x - b.position.x || a.position.y - b.position.y;
}