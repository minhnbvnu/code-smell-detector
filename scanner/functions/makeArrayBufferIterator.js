function* makeArrayBufferIterator(arrayBuffer, options = {}) {
    const { chunkSize = DEFAULT_CHUNK_SIZE2 } = options;
    let byteOffset = 0;
    while (byteOffset < arrayBuffer.byteLength) {
      const chunkByteLength = Math.min(arrayBuffer.byteLength - byteOffset, chunkSize);
      const chunk = new ArrayBuffer(chunkByteLength);
      const sourceArray = new Uint8Array(arrayBuffer, byteOffset, chunkByteLength);
      const chunkArray = new Uint8Array(chunk);
      chunkArray.set(sourceArray);
      byteOffset += chunkByteLength;
      yield chunk;
    }
  }