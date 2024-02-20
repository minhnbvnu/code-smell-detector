function linearGradientBoundingBox(gradientObj) {
  return {
    left: Math.min(gradientObj.x1, gradientObj.x2),
    top: Math.min(gradientObj.y1, gradientObj.y2),
    right: Math.max(gradientObj.x1, gradientObj.x2),
    bottom: Math.max(gradientObj.y1, gradientObj.y2),
    width: Math.abs(gradientObj.x1 - gradientObj.x2),
    height: Math.abs(gradientObj.y1 - gradientObj.y2)
  };
}