function applyImageAlgorithm(context, width, height, options) {
  const { threshold = 50, dithering = 'none' } = options;

  let imageData = context.getImageData(0, 0, width, height),
      imageUint8data;

  const algorithms = {
    'ordered': orderedDither,
    'atkinson': atkinsonDither,
    'errorDiffusion': errorDiffusionDither,
  };

  if (dithering === 'none') {
    imageUint8data = blackAndWhiteThreshold(imageData.data, threshold);
  } else {
    // Use "sharpen" as a way of applying a threshold value to dithered approaches.
    imageUint8data = sharpen(context, imageData, threshold / 100);
    imageUint8data = algorithms[dithering]({ uint8data: imageUint8data, w: width, h: height });
  }

  imageData.data.set(imageUint8data);

  return imageData;
}