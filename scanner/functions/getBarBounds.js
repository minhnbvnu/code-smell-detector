function getBarBounds(bar, useFinalPosition) {
  const {x, y, base, width, height} = /** @type {BarProps} */ (bar.getProps(['x', 'y', 'base', 'width', 'height'], useFinalPosition));

  let left, right, top, bottom, half;

  if (bar.horizontal) {
    half = height / 2;
    left = Math.min(x, base);
    right = Math.max(x, base);
    top = y - half;
    bottom = y + half;
  } else {
    half = width / 2;
    left = x - half;
    right = x + half;
    top = Math.min(y, base);
    bottom = Math.max(y, base);
  }

  return {left, top, right, bottom};
}