function colorToGlsl(color) {
  const array = asArray(color);
  const alpha = array.length > 3 ? array[3] : 1;
  // all components are premultiplied with alpha value
  return arrayToGlsl([
    (array[0] / 255) * alpha,
    (array[1] / 255) * alpha,
    (array[2] / 255) * alpha,
    alpha,
  ]);
}