function getTypedArrayForBufferView(json, buffers, bufferViewIndex) {
    const bufferView = json.bufferViews[bufferViewIndex];
    assert9(bufferView);
    const bufferIndex = bufferView.buffer;
    const binChunk = buffers[bufferIndex];
    assert9(binChunk);
    const byteOffset = (bufferView.byteOffset || 0) + binChunk.byteOffset;
    return new Uint8Array(binChunk.arrayBuffer, byteOffset, bufferView.byteLength);
  }