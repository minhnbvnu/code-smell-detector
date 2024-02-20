function positionChildVertical(
  position,
  constraint,
  blockSize,
  childBlockSize
) {
  if (position.top < 0 && position.bottom >= 0) {
    position.top = position.bottom - childBlockSize;
  } else if (position.top >= 0 && position.bottom < 0) {
    position.bottom = position.top + childBlockSize;
  } else if (position.top < 0 && position.bottom < 0) {
    // Both unspecified.
    const c = constraint || {};
    if (c.centerVertical && blockSize !== null) {
      position.top = (blockSize - childBlockSize) / 2;
      position.bottom = position.top + childBlockSize;
    } else {
      position.top = 0;
      position.bottom = childBlockSize;
    }
  }
}