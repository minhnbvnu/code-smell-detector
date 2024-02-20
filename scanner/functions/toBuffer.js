function toBuffer(binaryData) {
  if (ArrayBuffer.isView(binaryData)) {
    binaryData = binaryData.buffer;
  }

  if (typeof Buffer !== 'undefined' && binaryData instanceof ArrayBuffer) {
    /* global Buffer */
    const buffer = new Buffer(binaryData.byteLength);
    const view = new Uint8Array(binaryData);
    for (let i = 0; i < buffer.length; ++i) {
      buffer[i] = view[i];
    }
    return buffer;
  }

  throw new Error('Failed to convert to buffer');
}