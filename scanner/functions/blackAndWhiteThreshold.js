function blackAndWhiteThreshold(rgbaImageData, threshold) {
  // These toGrayScale function values were borrowed from here:
  // https://www.jonathan-petitcolas.com/2017/12/28/converting-image-to-ascii-art.html#turning-an-image-into-gray-colors
  const toGrayScale = (r, g, b) => 0.21 * r + 0.72 * g + 0.07 * b;
  const grayscaleThreshold = (threshold / 100) * 255;

  for (let i = 0; i < rgbaImageData.length; i += 4) {
    // convert pixel to grayscale
    const r = rgbaImageData[i];
    const g = rgbaImageData[i + 1];
    const b = rgbaImageData[i + 2];
    const grayScaleVal = toGrayScale(r, g, b);

    // convert to black/white, based on the threshold
    const thresholdedVal = grayScaleVal > grayscaleThreshold ? 255 : 0;

    // set the thresholded values into the array
    rgbaImageData[i] = thresholdedVal;
    rgbaImageData[i + 1] = thresholdedVal;
    rgbaImageData[i + 2] = thresholdedVal;
    // Note: we currently ignore the transparency value;
  }

  return rgbaImageData;
}