function findStyle(styleValue, defaultStyle, sharedStyles) {
  if (Array.isArray(styleValue)) {
    return styleValue;
  }
  if (typeof styleValue === 'string') {
    return findStyle(sharedStyles[styleValue], defaultStyle, sharedStyles);
  }
  return defaultStyle;
}