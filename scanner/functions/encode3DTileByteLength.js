function encode3DTileByteLength(dataView, byteOffsetTileStart, byteLength) {
    if (!dataView) {
      return;
    }
    dataView.setUint32(byteOffsetTileStart + 8, byteLength, true);
  }