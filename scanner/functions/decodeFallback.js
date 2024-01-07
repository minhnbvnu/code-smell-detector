function decodeFallback(image, src) {
  if (src) {
    image.src = src;
  }
  return image.src && IMAGE_DECODE
    ? new Promise((resolve, reject) =>
        image
          .decode()
          .then(() => resolve(image))
          .catch((e) =>
            image.complete && image.width ? resolve(image) : reject(e),
          ),
      )
    : load(image);
}