function deleteImage(image) {
  if (image.close) {
    // Is ImageBitmap
    image.close();
  }
}