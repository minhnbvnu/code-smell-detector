function getNumericStyleProperty(style, prop) {
  return parseInt(style.getPropertyValue(prop), 10)
}