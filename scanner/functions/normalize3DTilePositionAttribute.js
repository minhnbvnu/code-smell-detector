function normalize3DTilePositionAttribute(tile, positions, options) {
    if (!tile.isQuantized) {
      return positions;
    }
    if (options["3d-tiles"] && options["3d-tiles"].decodeQuantizedPositions) {
      tile.isQuantized = false;
      return decodeQuantizedPositions(tile, positions);
    }
    return {
      type: GL2.UNSIGNED_SHORT,
      value: positions,
      size: 3,
      normalized: true
    };
  }