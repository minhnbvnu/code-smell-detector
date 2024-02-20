function extractGLTFBufferOrURL(tile, gltfFormat, options) {
    switch (gltfFormat) {
      case GLTF_FORMAT.URI:
        const gltfUrlBytes = new Uint8Array(tile.gltfArrayBuffer, tile.gltfByteOffset);
        const textDecoder = new TextDecoder();
        const gltfUrl = textDecoder.decode(gltfUrlBytes);
        tile.gltfUrl = gltfUrl.replace(/[\s\0]+$/, "");
        delete tile.gltfArrayBuffer;
        delete tile.gltfByteOffset;
        delete tile.gltfByteLength;
        break;
      case GLTF_FORMAT.EMBEDDED:
        break;
      default:
        throw new Error("b3dm: Illegal glTF format field");
    }
  }