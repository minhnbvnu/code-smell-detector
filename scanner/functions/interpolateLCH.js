function interpolateLCH(position, left, right) {
  if (isNaN(position) || position <= 0) {
    return left;
  } else if (position >= 1) {
    return right;
  }

  return new ColorLCH(lerp(position, left.l, right.l), lerp(position, left.c, right.c), lerpAnglesInDegrees(position, left.h, right.h));
}