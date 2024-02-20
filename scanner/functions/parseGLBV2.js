function parseGLBV2(glb, dataView, byteOffset, options) {
    assert2(glb.header.byteLength > GLB_FILE_HEADER_SIZE + GLB_CHUNK_HEADER_SIZE);
    parseGLBChunksSync(glb, dataView, byteOffset, options);
    return byteOffset + glb.header.byteLength;
  }