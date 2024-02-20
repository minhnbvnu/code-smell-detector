function getPointAtSegmentLength(p1x,p1y,c1x,c1y,c2x,c2y,p2x,p2y,length) {
  return (length == null) ? bezlen(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) :
    findDotsAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y,
      getTatLen(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, length));
}