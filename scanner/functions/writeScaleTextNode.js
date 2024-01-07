function writeScaleTextNode(node, scale) {
  // the Math is to remove any excess decimals created by float arithmetic
  writeDecimalTextNode(node, Math.round(scale * 1e6) / 1e6);
}