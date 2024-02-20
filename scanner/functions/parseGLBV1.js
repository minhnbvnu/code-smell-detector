function parseGLBV1(glb, dataView, byteOffset) {
    assert2(glb.header.byteLength > GLB_FILE_HEADER_SIZE + GLB_CHUNK_HEADER_SIZE);
    const contentLength = dataView.getUint32(byteOffset + 0, LE);
    const contentFormat = dataView.getUint32(byteOffset + 4, LE);
    byteOffset += GLB_CHUNK_HEADER_SIZE;
    assert2(contentFormat === GLB_V1_CONTENT_FORMAT_JSON);
    parseJSONChunk(glb, dataView, byteOffset, contentLength);
    byteOffset += contentLength;
    byteOffset += parseBINChunk(glb, dataView, byteOffset, glb.header.byteLength);
    return byteOffset;
  }