function sliceAverage(dataArray, sliceWidth, sliceNumber) {
  const start = sliceWidth * sliceNumber;
  const end = start + sliceWidth;
  let sum = 0;

  for (let i = start; i < end; i++) {
    sum += dataArray[i];
  }

  return sum / sliceWidth;
}