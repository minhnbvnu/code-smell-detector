function pathPointIsCorner(p) {
  var xy = p.anchor;
  // Vertices of polylines (often) use PointType.SMOOTH. Need to check control points
  //   to determine if the line is curved or not at p
  // if (p.pointType != PointType.CORNER) return false;
  if (xy[0] != p.leftDirection[0] || xy[0] != p.rightDirection[0] ||
      xy[1] != p.leftDirection[1] || xy[1] != p.rightDirection[1]) return false;
  return true;
}