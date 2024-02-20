function _matrixConcat(mat1, mat2) {
  if (mat1.length === 0) return mat2;

  const newMatrix = [];

  mat1.forEach((row, index) => {
    // We go row by row, concatenating mat1 to mat2.
    newMatrix.push(
      // the [0] puts a spacer between the two characters.
      row.concat([0]).concat(mat2[index])
    );
  });

  return newMatrix;
}