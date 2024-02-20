function interpolateByColorSpace(position, space, left, right) {
  if (isNaN(position) || position <= 0) {
    return left;
  } else if (position >= 1) {
    return right;
  }

  switch (space) {
    case ColorInterpolationSpace.HSL:
      return hslToRGB(interpolateHSL(position, rgbToHSL(left), rgbToHSL(right)));

    case ColorInterpolationSpace.HSV:
      return hsvToRGB(interpolateHSV(position, rgbToHSV(left), rgbToHSV(right)));

    case ColorInterpolationSpace.XYZ:
      return xyzToRGB(interpolateXYZ(position, rgbToXYZ(left), rgbToXYZ(right)));

    case ColorInterpolationSpace.LAB:
      return labToRGB(interpolateLAB(position, rgbToLAB(left), rgbToLAB(right)));

    case ColorInterpolationSpace.LCH:
      return lchToRGB(interpolateLCH(position, rgbToLCH(left), rgbToLCH(right)));

    default:
      return interpolateRGB(position, left, right);
  }
}