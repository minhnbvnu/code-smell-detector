function interpolateLAB(position, left, right) {
  if (isNaN(position) || position <= 0) {
    return left;
  } else if (position >= 1) {
    return right;
  }

  return new ColorLAB(lerp(position, left.l, right.l), lerp(position, left.a, right.a), lerp(position, left.b, right.b));
}