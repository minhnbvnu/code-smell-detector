function composeSMaskLuminosity(maskData, layerData, transferMap) {
    const length = maskData.length;

    for (let i = 3; i < length; i += 4) {
      const y = maskData[i - 3] * 77 + maskData[i - 2] * 152 + maskData[i - 1] * 28;
      layerData[i] = transferMap ? layerData[i] * transferMap[y >> 8] >> 8 : layerData[i] * y >> 16;
    }
  }