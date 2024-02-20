function encodeComposite3DTile(tile, dataView, byteOffset, options, encode3DTile2) {
    tile = { magic: MAGIC_ARRAY.COMPOSITE, tiles: [], ...tile };
    const byteOffsetStart = byteOffset;
    byteOffset += encode3DTileHeader(tile, dataView, byteOffset);
    if (dataView) {
      dataView.setUint32(byteOffset, tile.tiles.length, true);
    }
    byteOffset += 4;
    for (let i2 = 0; i2 < tile.tiles.length; ++i2) {
      byteOffset += encode3DTile2(tile.tiles[i2], dataView, byteOffset, options);
    }
    encode3DTileByteLength(dataView, byteOffsetStart, byteOffset - byteOffsetStart);
    return byteOffset;
  }