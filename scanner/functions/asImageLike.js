function asImageLike(data) {
  return data instanceof Image ||
    data instanceof HTMLCanvasElement ||
    data instanceof HTMLVideoElement ||
    data instanceof ImageBitmap
    ? data
    : null;
}