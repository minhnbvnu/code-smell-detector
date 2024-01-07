function readRegionSegmentInformation(data, start) {
    return {
      width: (0, _core_utils.readUint32)(data, start),
      height: (0, _core_utils.readUint32)(data, start + 4),
      x: (0, _core_utils.readUint32)(data, start + 8),
      y: (0, _core_utils.readUint32)(data, start + 12),
      combinationOperator: data[start + 16] & 7
    };
  }