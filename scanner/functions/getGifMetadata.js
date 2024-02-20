function getGifMetadata(binaryData) {
    const dataView = toDataView(binaryData);
    const isGif = dataView.byteLength >= 10 && dataView.getUint32(0, BIG_ENDIAN) === 1195984440;
    if (!isGif) {
      return null;
    }
    return {
      mimeType: "image/gif",
      width: dataView.getUint16(6, LITTLE_ENDIAN),
      height: dataView.getUint16(8, LITTLE_ENDIAN)
    };
  }