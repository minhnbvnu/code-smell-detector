function copyToArray(source, target, targetOffset) {
    let sourceArray;
    if (source instanceof ArrayBuffer) {
      sourceArray = new Uint8Array(source);
    } else {
      const srcByteOffset = source.byteOffset;
      const srcByteLength = source.byteLength;
      sourceArray = new Uint8Array(source.buffer || source.arrayBuffer, srcByteOffset, srcByteLength);
    }
    target.set(sourceArray, targetOffset);
    return targetOffset + padToNBytes(sourceArray.byteLength, 4);
  }