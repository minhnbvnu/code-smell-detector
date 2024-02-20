function getArrayBufferAtOffset(arrayBuffer, byteOffset) {
  const length = arrayBuffer.byteLength - byteOffset;
  const binaryBuffer = new ArrayBuffer(length);
  const sourceArray = new Uint8Array(arrayBuffer);
  const binaryArray = new Uint8Array(binaryBuffer);
  for (let i = 0; i < length; i++) {
    binaryArray[i] = sourceArray[byteOffset + i];
  }
  return binaryBuffer;
}