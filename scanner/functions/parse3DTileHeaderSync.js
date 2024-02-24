function parse3DTileHeaderSync(tile, arrayBuffer, byteOffset = 0) {
    const view = new DataView(arrayBuffer);
    tile.magic = view.getUint32(byteOffset, true);
    byteOffset += SIZEOF_UINT32;
    tile.version = view.getUint32(byteOffset, true);
    byteOffset += SIZEOF_UINT32;
    tile.byteLength = view.getUint32(byteOffset, true);
    byteOffset += SIZEOF_UINT32;
    if (tile.version !== 1) {
      throw new Error(`3D Tile Version ${tile.version} not supported`);
    }
    return byteOffset;
  }