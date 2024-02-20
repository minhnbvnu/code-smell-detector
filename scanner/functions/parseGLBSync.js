function parseGLBSync(glb, arrayBuffer, byteOffset = 0, options = {}) {
  // Check that GLB Header starts with the magic number
  const dataView = new DataView(arrayBuffer);

  glb.type = getMagicString(dataView, byteOffset + 0);
  glb.version = dataView.getUint32(byteOffset + 4, LE); // Version 2 of binary glTF container format
  const byteLength = dataView.getUint32(byteOffset + 8, LE); // Total byte length of generated file

  // Less important stuff in a header
  glb.header = {
    byteOffset, // Byte offset into the initial arrayBuffer
    byteLength
  };

  if (glb.type !== 'glTF') {
    console.warn(`Invalid GLB magic string ${glb.type}`); // eslint-disable-line
  }

  assert(glb.version === 2, `Invalid GLB version ${glb.version}. Only .glb v2 supported`);
  assert(glb.header.byteLength > GLB_FILE_HEADER_SIZE + GLB_CHUNK_HEADER_SIZE);

  // Per spec we must iterate over chunks, ignoring all except JSON and BIN
  glb.json = {};
  glb.hasBinChunk = false;
  glb.binChunks = [];

  parseGLBChunksSync(glb, dataView, byteOffset + 12, options);

  // DEPRECATED - duplicate header fields in root of returned object
  addDeprecatedFields(glb);

  return byteOffset + glb.header.byteLength;
}