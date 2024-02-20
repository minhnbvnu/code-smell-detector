function clampDimensions(imageWidth, imageHeight, canvasWidth, canvasHeight) {
  const heightRatio = imageHeight / canvasHeight;
  const widthRatio = imageWidth / canvasWidth;

  // If the image is unconstrained (ie. very small images), return the dimensions as-is.
  if (heightRatio < 1 && widthRatio < 1) {
    return [imageWidth, imageHeight];
  }

  const getDimensionsClampedByHeight = () => {
    const reducedWidth = Math.floor(imageWidth * canvasHeight / imageHeight);
    return [reducedWidth, canvasHeight];
  }

  const getDimensionsClampedByWidth = () => {
    const reducedHeight = Math.floor(imageHeight * canvasWidth / imageWidth);
    return [canvasWidth, reducedHeight];
  }

  // Determine the most constrained dimension, and clamp accordingly.
  return heightRatio > widthRatio ?
    getDimensionsClampedByHeight() :
    getDimensionsClampedByWidth();
}