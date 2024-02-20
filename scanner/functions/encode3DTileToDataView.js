function encode3DTileToDataView(tile, dataView, byteOffset, options) {
    assert2(typeof tile.type === "string");
    switch (tile.type) {
      case TILE3D_TYPE.COMPOSITE:
        return encodeComposite3DTile(tile, dataView, byteOffset, options, encode3DTileToDataView);
      case TILE3D_TYPE.POINT_CLOUD:
        return encodePointCloud3DTile(tile, dataView, byteOffset, options);
      case TILE3D_TYPE.BATCHED_3D_MODEL:
        return encodeBatchedModel3DTile(tile, dataView, byteOffset, options);
      case TILE3D_TYPE.INSTANCED_3D_MODEL:
        return encodeInstancedModel3DTile(tile, dataView, byteOffset, options);
      default:
        throw new Error("3D Tiles: unknown tile type");
    }
  }