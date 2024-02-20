function getMagicString2(arrayBuffer, byteOffset, length4) {
    if (arrayBuffer.byteLength < byteOffset + length4) {
      return "";
    }
    const dataView = new DataView(arrayBuffer);
    let magic = "";
    for (let i2 = 0; i2 < length4; i2++) {
      magic += String.fromCharCode(dataView.getUint8(byteOffset + i2));
    }
    return magic;
  }