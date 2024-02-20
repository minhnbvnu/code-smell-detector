function rgbToLinearLuminance(rgb) {
  return rgb.r * 0.2126 + rgb.g * 0.7152 + rgb.b * 0.0722;
}