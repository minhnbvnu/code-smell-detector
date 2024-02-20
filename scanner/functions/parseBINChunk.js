function parseBINChunk(glb, dataView, byteOffset, chunkLength, options) {
  // Note: BIN chunk can be optional
  glb.header.hasBinChunk = true;
  glb.binChunks.push({
    byteOffset,
    byteLength: chunkLength,
    arrayBuffer: dataView.buffer
    // TODO - copy, or create typed array view?
  });
}