function copyPaddedStringToDataView(dataView, byteOffset, string, padding) {
    const textEncoder = new TextEncoder();
    const stringBuffer = textEncoder.encode(string);
    byteOffset = copyPaddedArrayBufferToDataView(dataView, byteOffset, stringBuffer, padding);
    return byteOffset;
  }