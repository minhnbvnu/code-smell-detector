function getGLBXVIZJSONBuffer(arrayBuffer, byteOffset = 0) {
  // GLB Header
  const dataView = new DataView(arrayBuffer);
  const glb = {};

  glb.byteOffset = byteOffset; // Byte offset into the initial arrayBuffer

  // GLB Header
  glb.magic = dataView.getUint32(byteOffset + 0, BE); // Magic number (the ASCII string 'glTF').
  glb.version = dataView.getUint32(byteOffset + 4, LE); // Version 2 of binary glTF container format
  glb.byteLength = dataView.getUint32(byteOffset + 8, LE); // Total byte length of generated file

  if (glb.version !== 2 || glb.byteLength < 20) {
    return null;
  }

  glb.jsonChunkLength = dataView.getUint32(byteOffset + 12, LE); // Byte length of json chunk
  glb.jsonChunkFormat = dataView.getUint32(byteOffset + 16, LE); // Chunk format as uint32

  const GLB_CHUNK_TYPE_JSON = 0x4e4f534a;
  const isJSONChunk = glb.jsonChunkFormat === GLB_CHUNK_TYPE_JSON || glb.jsonChunkFormat === 0;

  if (!isJSONChunk) {
    // JSON should be first and present
    return null;
  }

  glb.jsonChunkByteOffset = GLB_FILE_HEADER_SIZE + GLB_CHUNK_HEADER_SIZE; // First headers: 20 bytes
  return new Uint8Array(arrayBuffer, byteOffset + glb.jsonChunkByteOffset, glb.jsonChunkLength);
}