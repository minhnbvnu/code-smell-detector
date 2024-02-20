async function parseComposite3DTile(tile, arrayBuffer, byteOffset, options, context, parse3DTile2) {
    byteOffset = parse3DTileHeaderSync(tile, arrayBuffer, byteOffset);
    const view = new DataView(arrayBuffer);
    tile.tilesLength = view.getUint32(byteOffset, true);
    byteOffset += 4;
    tile.tiles = [];
    while (tile.tiles.length < tile.tilesLength && tile.byteLength - byteOffset > 12) {
      const subtile = {};
      tile.tiles.push(subtile);
      byteOffset = await parse3DTile2(arrayBuffer, byteOffset, options, context, subtile);
    }
    return byteOffset;
  }