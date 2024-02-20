function parse3DTileTablesSync(tile, arrayBuffer, byteOffset, options) {
    byteOffset = parse3DTileFeatureTable(tile, arrayBuffer, byteOffset, options);
    byteOffset = parse3DTileBatchTable(tile, arrayBuffer, byteOffset, options);
    return byteOffset;
  }