function getRenderPixel(event, pixel) {
  return applyTransform(event.inversePixelTransform, pixel.slice(0));
}