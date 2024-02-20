function getColorStride(colors, vertexCount) {
  if (colors) {
    if (colors.length / 4 === vertexCount) {
      return 4;
    }
    if (colors.length / 3 === vertexCount) {
      return 3;
    }
    let stride;
    if (Array.isArray(colors[0])) {
      stride = colors[0].length;
    } else {
      stride = colors.length;
    }
    if (stride === 3 || stride === 4) {
      return stride;
    }
    log.error('Unknown point color format');
  }
  return 0;
}