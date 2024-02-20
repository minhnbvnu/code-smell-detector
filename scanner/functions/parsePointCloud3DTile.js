async function parsePointCloud3DTile(tile, arrayBuffer, byteOffset, options, context) {
    byteOffset = parse3DTileHeaderSync(tile, arrayBuffer, byteOffset);
    byteOffset = parse3DTileTablesHeaderSync(tile, arrayBuffer, byteOffset);
    byteOffset = parse3DTileTablesSync(tile, arrayBuffer, byteOffset, options);
    initializeTile(tile);
    const { featureTable, batchTable } = parsePointCloudTables(tile);
    await parseDraco(tile, featureTable, batchTable, options, context);
    parsePositions(tile, featureTable, options);
    parseColors(tile, featureTable, batchTable);
    parseNormals(tile, featureTable);
    return byteOffset;
  }