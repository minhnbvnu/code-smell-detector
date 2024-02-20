function getPixelStyleProperty(style, prop) {
  return Number(style.getPropertyValue(prop).match(/(\d*(\.\d*)?)px/)[1])
}