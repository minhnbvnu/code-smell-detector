function defaultClip(xScale, yScale, allowedOverflow) {
  if (allowedOverflow === false) {
    return false;
  }
  const x = scaleClip(xScale, allowedOverflow);
  const y = scaleClip(yScale, allowedOverflow);

  return {
    top: y.end,
    right: x.end,
    bottom: y.start,
    left: x.start
  };
}