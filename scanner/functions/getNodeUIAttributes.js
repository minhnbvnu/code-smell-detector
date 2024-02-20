function getNodeUIAttributes(nodeId, dRatio) {
    const fontSize = 24 * dRatio + 12;
    const size = textMeasure(nodeId, fontSize);
    const width = size.totalWidth + size.spaceWidth * 6;
    const height = fontSize * 1.6;

    return {
      fontSize,
      width,
      height,
      x: -width/2,
      y: -height/2,
      rx: 15 * dRatio + 2,
      ry: 15 * dRatio + 2,
      px: -width/2 + size.spaceWidth*3,
      py: -height/2 + fontSize * 1.1,
      strokeWidth: 4 * dRatio + 1
    };
  }