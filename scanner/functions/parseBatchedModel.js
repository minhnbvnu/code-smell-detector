function parseBatchedModel(tile, arrayBuffer, byteOffset, options, context) {
    byteOffset = parse3DTileHeaderSync(tile, arrayBuffer, byteOffset);
    byteOffset = parse3DTileTablesHeaderSync(tile, arrayBuffer, byteOffset);
    byteOffset = parse3DTileTablesSync(tile, arrayBuffer, byteOffset, options);
    byteOffset = parse3DTileGLTFViewSync(tile, arrayBuffer, byteOffset, options);
    const featureTable = new Tile3DFeatureTable(tile.featureTableJson, tile.featureTableBinary);
    tile.rtcCenter = featureTable.getGlobalProperty("RTC_CENTER", GL2.FLOAT, 3);
    return byteOffset;
  }