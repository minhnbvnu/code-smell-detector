function GLTFBinaryExtension(data) {

  this.name = EXTENSIONS.KHR_BINARY_GLTF;
  this.content = null;
  this.body = null;

  var headerView = new DataView(data, 0, BINARY_EXTENSION_HEADER_LENGTH);

  this.header = {
    magic: THREE.LoaderUtils.decodeText(new Uint8Array(data.slice(0, 4))),
    version: headerView.getUint32(4, true),
    length: headerView.getUint32(8, true)
  };

  if (this.header.magic !== BINARY_EXTENSION_HEADER_MAGIC) {

    throw new Error('THREE.GLTFLoader: Unsupported glTF-Binary header.');

  } else if (this.header.version < 2.0) {

    throw new Error('THREE.GLTFLoader: Legacy binary file detected. Use LegacyGLTFLoader instead.');

  }

  var chunkView = new DataView(data, BINARY_EXTENSION_HEADER_LENGTH);
  var chunkIndex = 0;

  while (chunkIndex < chunkView.byteLength) {

    var chunkLength = chunkView.getUint32(chunkIndex, true);
    chunkIndex += 4;

    var chunkType = chunkView.getUint32(chunkIndex, true);
    chunkIndex += 4;

    if (chunkType === BINARY_EXTENSION_CHUNK_TYPES.JSON) {

      var contentArray = new Uint8Array(data, BINARY_EXTENSION_HEADER_LENGTH + chunkIndex, chunkLength);
      this.content = THREE.LoaderUtils.decodeText(contentArray);

    } else if (chunkType === BINARY_EXTENSION_CHUNK_TYPES.BIN) {

      var byteOffset = BINARY_EXTENSION_HEADER_LENGTH + chunkIndex;
      this.body = data.slice(byteOffset, byteOffset + chunkLength);

    }

    // Clients must ignore chunks with unknown types.

    chunkIndex += chunkLength;

  }

  if (this.content === null) {

    throw new Error('THREE.GLTFLoader: JSON content not found.');

  }

}