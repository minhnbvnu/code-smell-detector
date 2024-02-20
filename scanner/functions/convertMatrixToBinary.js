function convertMatrixToBinary(data) {
  const newMatrix = [];

  for (let i = 0; i < data.length; i++) {
    newMatrix[i] = [];
    for (let j = 0; j < data[i].length; j++) {
      newMatrix[i][j] = data[i][j] === true ? 1 : 0;
    }
  }

  return newMatrix;
}