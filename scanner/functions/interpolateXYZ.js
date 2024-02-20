function interpolateXYZ(position, left, right) {
  if (isNaN(position) || position <= 0) {
    return left;
  } else if (position >= 1) {
    return right;
  }

  return new ColorXYZ(lerp(position, left.x, right.x), lerp(position, left.y, right.y), lerp(position, left.z, right.z));
}