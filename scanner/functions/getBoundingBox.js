function getBoundingBox(image) {
  try {
    return image.getBoundingBox();
  } catch (_) {
    return [0, 0, image.getWidth(), image.getHeight()];
  }
}