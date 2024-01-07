function decode(image, src) {
  if (src) {
    image.src = src;
  }
  return image.src && IMAGE_DECODE && CREATE_IMAGE_BITMAP
    ? image
        .decode()
        .then(() => createImageBitmap(image))
        .catch((e) => {
          if (image.complete && image.width) {
            return image;
          }
          throw e;
        })
    : decodeFallback(image);
}