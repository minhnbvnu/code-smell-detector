function unpackGLBBuffers(arrayBuffer, json, binaryByteOffset) {
  // TODO - really inefficient, should just use the offset into the original array buffer
  if (binaryByteOffset) {
    arrayBuffer = getArrayBufferAtOffset(arrayBuffer, binaryByteOffset);
  }

  const bufferViews = json.bufferViews || [];

  for (let i = 0; i < bufferViews.length; ++i) {
    const bufferView = bufferViews[i];
    assert(bufferView.byteLength >= 0);
  }

  return {
    // TODO: delete unpackAccessors and use buffer views only?
    accessors: unpackAccessors(arrayBuffer, bufferViews, json),
    images: unpackImages(arrayBuffer, bufferViews, json)
  };
}