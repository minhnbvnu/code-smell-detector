function radialGradientBoundingBox(gradientObj) {
  return {
    left: gradientObj.cx - gradientObj.r,
    top: gradientObj.cy - gradientObj.r,
    right: gradientObj.cx + gradientObj.r,
    bottom: gradientObj.cy + gradientObj.r,
    width: gradientObj.r * 2,
    height: gradientObj.r * 2
  };
}