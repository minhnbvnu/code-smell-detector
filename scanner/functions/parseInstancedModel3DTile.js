async function parseInstancedModel3DTile(tile, arrayBuffer, byteOffset, options, context) {
    byteOffset = parseInstancedModel(tile, arrayBuffer, byteOffset, options, context);
    await extractGLTF(tile, tile.gltfFormat, options, context);
    return byteOffset;
  }