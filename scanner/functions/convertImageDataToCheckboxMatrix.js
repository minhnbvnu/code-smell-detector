function convertImageDataToCheckboxMatrix(imageData) {
  const checkboxMatrix = [];
  const width = imageData.width;

  for (let i = 0; i < imageData.data.length; i += 4) {
    const pixelNum = i/4;
    const rowNumber = Math.floor(pixelNum / width);
    const rowIndex = pixelNum % width;

    if (rowIndex === 0) {
      checkboxMatrix[rowNumber] = [];
    }

    checkboxMatrix[rowNumber][rowIndex] = imageData.data[i] === 255 ? 0 : 1;
  }

  return checkboxMatrix;
}