function getResolutions(image, referenceImage) {
  try {
    return image.getResolution(referenceImage);
  } catch (_) {
    return [
      referenceImage.getWidth() / image.getWidth(),
      referenceImage.getHeight() / image.getHeight(),
    ];
  }
}