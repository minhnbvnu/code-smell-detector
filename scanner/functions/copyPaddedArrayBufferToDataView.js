function copyPaddedArrayBufferToDataView(dataView, byteOffset, sourceBuffer, padding) {
    const paddedLength = padToNBytes(sourceBuffer.byteLength, padding);
    const padLength = paddedLength - sourceBuffer.byteLength;
    if (dataView) {
      const targetArray = new Uint8Array(dataView.buffer, dataView.byteOffset + byteOffset, sourceBuffer.byteLength);
      const sourceArray = new Uint8Array(sourceBuffer);
      targetArray.set(sourceArray);
      for (let i2 = 0; i2 < padLength; ++i2) {
        dataView.setUint8(byteOffset + sourceBuffer.byteLength + i2, 32);
      }
    }
    byteOffset += paddedLength;
    return byteOffset;
  }