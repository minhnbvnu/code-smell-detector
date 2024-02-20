function blendMultiply(bottom, top) {
  return new ColorRGBA64(blendMultiplyChannel(bottom.r, top.r), blendMultiplyChannel(bottom.g, top.g), blendMultiplyChannel(bottom.b, top.b), 1);
}