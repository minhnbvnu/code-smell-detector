function normalize3DTileColorAttribute(tile, colors, batchTable) {
    if (!colors && (!tile || !tile.batchIds || !batchTable)) {
      return null;
    }
    const { batchIds, isRGB565, pointCount } = tile;
    if (batchIds && batchTable) {
      const colorArray = new Uint8ClampedArray(pointCount * 3);
      for (let i2 = 0; i2 < pointCount; i2++) {
        const batchId = batchIds[i2];
        const dimensions = batchTable.getProperty(batchId, "dimensions");
        const color = dimensions.map((d) => d * 255);
        colorArray[i2 * 3] = color[0];
        colorArray[i2 * 3 + 1] = color[1];
        colorArray[i2 * 3 + 2] = color[2];
      }
      return {
        type: GL2.UNSIGNED_BYTE,
        value: colorArray,
        size: 3,
        normalized: true
      };
    }
    if (isRGB565) {
      const colorArray = new Uint8ClampedArray(pointCount * 3);
      for (let i2 = 0; i2 < pointCount; i2++) {
        const color = decodeRGB565(colors[i2]);
        colorArray[i2 * 3] = color[0];
        colorArray[i2 * 3 + 1] = color[1];
        colorArray[i2 * 3 + 2] = color[2];
      }
      return {
        type: GL2.UNSIGNED_BYTE,
        value: colorArray,
        size: 3,
        normalized: true
      };
    }
    if (colors && colors.length === pointCount * 3) {
      return {
        type: GL2.UNSIGNED_BYTE,
        value: colors,
        size: 3,
        normalized: true
      };
    }
    return {
      type: GL2.UNSIGNED_BYTE,
      value: colors,
      size: 4,
      normalized: true
    };
  }