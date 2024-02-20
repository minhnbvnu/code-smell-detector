function _checkForValidMatrix(matrix) {
  if (Array.isArray(matrix) && Array.isArray(matrix[0])) return;

  throw new Error(`${matrix} is not a valid matrix.`);
}