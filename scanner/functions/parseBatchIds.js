function parseBatchIds(tile, featureTable) {
    let batchTable = null;
    if (!tile.batchIds && featureTable.hasProperty("BATCH_ID")) {
      tile.batchIds = featureTable.getPropertyArray("BATCH_ID", GL2.UNSIGNED_SHORT, 1);
      if (tile.batchIds) {
        const batchFeatureLength = featureTable.getGlobalProperty("BATCH_LENGTH");
        if (!batchFeatureLength) {
          throw new Error("Global property: BATCH_LENGTH must be defined when BATCH_ID is defined.");
        }
        const { batchTableJson, batchTableBinary } = tile;
        batchTable = new Tile3DBatchTableParser(batchTableJson, batchTableBinary, batchFeatureLength);
      }
    }
    return batchTable;
  }