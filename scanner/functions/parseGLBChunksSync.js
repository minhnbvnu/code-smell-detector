function parseGLBChunksSync(glb, dataView, byteOffset, options) {
  // Iterate as long as there is space left for another chunk header
  while (byteOffset + 8 <= glb.header.byteLength) {
    const chunkLength = dataView.getUint32(byteOffset + 0, LE); // Byte length of chunk
    const chunkFormat = dataView.getUint32(byteOffset + 4, LE); // Chunk format as uint32
    byteOffset += GLB_CHUNK_HEADER_SIZE;

    // Per spec we must iterate over chunks, ignoring all except JSON and BIN
    switch (chunkFormat) {
      case GLB_CHUNK_TYPE_JSON:
        parseJSONChunk(glb, dataView, byteOffset, chunkLength, options);
        break;
      case GLB_CHUNK_TYPE_BIN:
        parseBINChunk(glb, dataView, byteOffset, chunkLength, options);
        break;
      default:
        // Ignore, per spec
        // console.warn(`Unknown GLB chunk type`); // eslint-disable-line
        break;
    }

    // DEPRECATED - Backward compatibility for very old xviz files
    switch (chunkFormat) {
      case 0:
        if (!options.strict) {
          parseJSONChunk(glb, dataView, byteOffset, chunkLength, options);
        }
        break;
      case 1:
        if (!options.strict) {
          parseBINChunk(glb, dataView, byteOffset, chunkLength, options);
        }
        break;
      default:
    }

    byteOffset += padTo4Bytes(chunkLength);
  }

  return byteOffset;
}