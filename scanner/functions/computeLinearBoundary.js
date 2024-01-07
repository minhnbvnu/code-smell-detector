function computeLinearBoundary(source) {
  const {scale = {}, fill} = source;
  const pixel = _getTargetPixel(fill, scale);

  if (isFinite(pixel)) {
    const horizontal = scale.isHorizontal();

    return {
      x: horizontal ? pixel : null,
      y: horizontal ? null : pixel
    };
  }

  return null;
}