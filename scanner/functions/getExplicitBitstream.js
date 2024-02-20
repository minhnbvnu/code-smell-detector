async function getExplicitBitstream(subtree, name8, internalBinaryBuffer) {
    const bufferViewIndex = subtree[name8].bufferView;
    const bufferView = subtree.bufferViews[bufferViewIndex];
    const buffer = subtree.buffers[bufferView.buffer];
    if (buffer.uri) {
      const response = await fetchFile(buffer.uri);
      const data = await response.arrayBuffer();
      return new Uint8Array(data, bufferView.byteOffset, bufferView.byteLength);
    }
    return new Uint8Array(internalBinaryBuffer, bufferView.byteOffset, bufferView.byteLength);
  }