function parsePointCloudTables(tile) {
    const featureTable = new Tile3DFeatureTable(tile.featureTableJson, tile.featureTableBinary);
    const pointsLength = featureTable.getGlobalProperty("POINTS_LENGTH");
    if (!Number.isFinite(pointsLength)) {
      throw new Error("POINTS_LENGTH must be defined");
    }
    featureTable.featuresLength = pointsLength;
    tile.featuresLength = pointsLength;
    tile.pointsLength = pointsLength;
    tile.pointCount = pointsLength;
    tile.rtcCenter = featureTable.getGlobalProperty("RTC_CENTER", GL2.FLOAT, 3);
    const batchTable = parseBatchIds(tile, featureTable);
    return { featureTable, batchTable };
  }