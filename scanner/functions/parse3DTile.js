async function parse3DTile(arrayBuffer, byteOffset = 0, options, context, tile = {}) {
    tile.byteOffset = byteOffset;
    tile.type = getMagicString3(arrayBuffer, byteOffset);
    switch (tile.type) {
      case TILE3D_TYPE.COMPOSITE:
        return await parseComposite3DTile(tile, arrayBuffer, byteOffset, options, context, parse3DTile);
      case TILE3D_TYPE.BATCHED_3D_MODEL:
        return await parseBatchedModel3DTile(tile, arrayBuffer, byteOffset, options, context);
      case TILE3D_TYPE.GLTF:
        return await parseGltf3DTile(tile, arrayBuffer, options, context);
      case TILE3D_TYPE.INSTANCED_3D_MODEL:
        return await parseInstancedModel3DTile(tile, arrayBuffer, byteOffset, options, context);
      case TILE3D_TYPE.POINT_CLOUD:
        return await parsePointCloud3DTile(tile, arrayBuffer, byteOffset, options, context);
      default:
        throw new Error(`3DTileLoader: unknown type ${tile.type}`);
    }
  }