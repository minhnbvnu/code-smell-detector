function constrainSizeTo (size, maxSize) {
  var aspectRatio;
  var pixelRatio = window.devicePixelRatio;

  if (!maxSize || (maxSize.width === -1 && maxSize.height === -1)) {
    return size;
  }

  if (size.width * pixelRatio < maxSize.width &&
    size.height * pixelRatio < maxSize.height) {
    return size;
  }

  aspectRatio = size.width / size.height;

  if ((size.width * pixelRatio) > maxSize.width && maxSize.width !== -1) {
    size.width = Math.round(maxSize.width / pixelRatio);
    size.height = Math.round(maxSize.width / aspectRatio / pixelRatio);
  }

  if ((size.height * pixelRatio) > maxSize.height && maxSize.height !== -1) {
    size.height = Math.round(maxSize.height / pixelRatio);
    size.width = Math.round(maxSize.height * aspectRatio / pixelRatio);
  }

  return size;
}