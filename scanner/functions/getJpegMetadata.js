function getJpegMetadata(binaryData) {
    const dataView = toDataView(binaryData);
    const isJpeg = dataView.byteLength >= 3 && dataView.getUint16(0, BIG_ENDIAN) === 65496 && dataView.getUint8(2) === 255;
    if (!isJpeg) {
      return null;
    }
    const { tableMarkers, sofMarkers } = getJpegMarkers();
    let i2 = 2;
    while (i2 + 9 < dataView.byteLength) {
      const marker2 = dataView.getUint16(i2, BIG_ENDIAN);
      if (sofMarkers.has(marker2)) {
        return {
          mimeType: "image/jpeg",
          height: dataView.getUint16(i2 + 5, BIG_ENDIAN),
          width: dataView.getUint16(i2 + 7, BIG_ENDIAN)
        };
      }
      if (!tableMarkers.has(marker2)) {
        return null;
      }
      i2 += 2;
      i2 += dataView.getUint16(i2, BIG_ENDIAN);
    }
    return null;
  }