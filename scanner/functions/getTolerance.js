function getTolerance(resolution, pixelRatio) {
  return (SIMPLIFY_TOLERANCE * resolution) / pixelRatio;
}