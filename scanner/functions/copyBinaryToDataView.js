function copyBinaryToDataView(dataView, byteOffset, binary, byteLength) {
    if (dataView) {
      for (let i2 = 0; i2 < byteLength; i2++) {
        dataView.setUint8(byteOffset + i2, binary[i2]);
      }
    }
    return byteOffset + byteLength;
  }