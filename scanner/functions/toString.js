function toString(mat) {
  const transformString =
    'matrix(' +
    mat
      .map(
        (value, i) =>
          Math.round(value * matrixPrecision[i]) / matrixPrecision[i],
      )
      .join(', ') +
    ')';
  return transformString;
}