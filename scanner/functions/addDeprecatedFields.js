function addDeprecatedFields(glb) {
  glb.byteOffset = glb.header.byteOffset;
  glb.magic = glb.header.magic;
  glb.version = glb.header.version;
  glb.byteLength = glb.header.byteLength;
  glb.hasBinChunk = glb.binChunks.length >= 1;
  glb.binChunkByteOffset = glb.header.hasBinChunk ? glb.binChunks[0].byteOffset : 0;
  glb.binChunkLength = glb.header.hasBinChunk ? glb.binChunks[0].byteLength : 0;
}