function getBmpMetadata(binaryData) {
    const dataView = toDataView(binaryData);
    const isBmp = dataView.byteLength >= 14 && dataView.getUint16(0, BIG_ENDIAN) === 16973 && dataView.getUint32(2, LITTLE_ENDIAN) === dataView.byteLength;
    if (!isBmp) {
      return null;
    }
    return {
      mimeType: "image/bmp",
      width: dataView.getUint32(18, LITTLE_ENDIAN),
      height: dataView.getUint32(22, LITTLE_ENDIAN)
    };
  }