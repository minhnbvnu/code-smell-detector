function copyStringToDataView(dataView, byteOffset, string, byteLength) {
    if (dataView) {
      for (let i2 = 0; i2 < byteLength; i2++) {
        dataView.setUint8(byteOffset + i2, string.charCodeAt(i2));
      }
    }
    return byteOffset + byteLength;
  }