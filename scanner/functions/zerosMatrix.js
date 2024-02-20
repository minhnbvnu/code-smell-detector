function zerosMatrix(rows, columns) {
  const matrix = [];

  for (let i = 0; i < rows; i++) {
    matrix.push([]);

    for (let j = 0; j < columns; j++) {
      matrix[i].push(0);
    }
  }

  return matrix;
}