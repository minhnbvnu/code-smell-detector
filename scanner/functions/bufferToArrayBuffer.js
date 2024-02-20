function bufferToArrayBuffer(buffer) {
    if (isBuffer(buffer)) {
      const typedArray = new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.length);
      return typedArray.slice().buffer;
    }
    return buffer;
  }