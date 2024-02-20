function parseInstancedModel(tile, arrayBuffer, byteOffset, options, context) {
    byteOffset = parse3DTileHeaderSync(tile, arrayBuffer, byteOffset);
    if (tile.version !== 1) {
      throw new Error(`Instanced 3D Model version ${tile.version} is not supported`);
    }
    byteOffset = parse3DTileTablesHeaderSync(tile, arrayBuffer, byteOffset);
    const view = new DataView(arrayBuffer);
    tile.gltfFormat = view.getUint32(byteOffset, true);
    byteOffset += 4;
    byteOffset = parse3DTileTablesSync(tile, arrayBuffer, byteOffset, options);
    byteOffset = parse3DTileGLTFViewSync(tile, arrayBuffer, byteOffset, options);
    if (tile.featureTableJsonByteLength === 0) {
      throw new Error("i3dm parser: featureTableJsonByteLength is zero.");
    }
    const featureTable = new Tile3DFeatureTable(tile.featureTableJson, tile.featureTableBinary);
    const instancesLength = featureTable.getGlobalProperty("INSTANCES_LENGTH");
    featureTable.featuresLength = instancesLength;
    if (!Number.isFinite(instancesLength)) {
      throw new Error("i3dm parser: INSTANCES_LENGTH must be defined");
    }
    tile.eastNorthUp = featureTable.getGlobalProperty("EAST_NORTH_UP");
    tile.rtcCenter = featureTable.getGlobalProperty("RTC_CENTER", GL2.FLOAT, 3);
    const batchTable = new Tile3DBatchTableParser(tile.batchTableJson, tile.batchTableBinary, instancesLength);
    extractInstancedAttributes(tile, featureTable, batchTable, instancesLength);
    return byteOffset;
  }