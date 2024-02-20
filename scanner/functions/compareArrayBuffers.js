function compareArrayBuffers(arrayBuffer1, arrayBuffer2, byteLength) {
    byteLength = byteLength || arrayBuffer1.byteLength;
    if (arrayBuffer1.byteLength < byteLength || arrayBuffer2.byteLength < byteLength) {
      return false;
    }
    const array1 = new Uint8Array(arrayBuffer1);
    const array2 = new Uint8Array(arrayBuffer2);
    for (let i2 = 0; i2 < array1.length; ++i2) {
      if (array1[i2] !== array2[i2]) {
        return false;
      }
    }
    return true;
  }