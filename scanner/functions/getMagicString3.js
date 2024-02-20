function getMagicString3(arrayBuffer, byteOffset = 0) {
    const dataView = new DataView(arrayBuffer);
    return `${String.fromCharCode(dataView.getUint8(byteOffset + 0))}${String.fromCharCode(dataView.getUint8(byteOffset + 1))}${String.fromCharCode(dataView.getUint8(byteOffset + 2))}${String.fromCharCode(dataView.getUint8(byteOffset + 3))}`;
  }