function sliceArrayBuffer(arrayBuffer, byteOffset, byteLength) {
    const subArray = byteLength !== void 0 ? new Uint8Array(arrayBuffer).subarray(byteOffset, byteOffset + byteLength) : new Uint8Array(arrayBuffer).subarray(byteOffset);
    const arrayCopy = new Uint8Array(subArray);
    return arrayCopy.buffer;
  }