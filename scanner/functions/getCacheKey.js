function getCacheKey(src, crossOrigin, color) {
  const colorString = color ? asArray(color) : 'null';
  return crossOrigin + ':' + src + ':' + colorString;
}