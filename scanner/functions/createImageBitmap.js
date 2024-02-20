function createImageBitmap(src, x, y, w, h, options) {
  let image;
  if (src.constructor.name === 'HTMLImageElement') {
    image = src.image;
  } else if (src.constructor.name === 'Blob') {
    image = new bindings.nativeImage();
    try {
      image.load(src.buffer);
    } catch (err) {
      return Promise.reject(new Error('failed to load image'));
    }
  } else {
    return Promise.reject(new Error('invalid arguments. Unknown constructor type: ' + src.constructor.name));
  }

  if (typeof x === 'object') {
    options = x;
    x = undefined;
  }

  x = x || 0;
  y = y || 0;
  w = w || image.width;
  h = h || image.height;
  const flipY = !!options && options.imageOrientation === 'flipY';
  const imageBitmap = new ImageBitmap(
    image,
    x,
    y,
    w,
    h,
    flipY,
  );
  return Promise.resolve(imageBitmap);
}