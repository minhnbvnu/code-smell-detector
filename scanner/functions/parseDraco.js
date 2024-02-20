async function parseDraco(tile, featureTable, batchTable, options, context) {
    let dracoBuffer;
    let dracoFeatureTableProperties;
    let dracoBatchTableProperties;
    const batchTableDraco = tile.batchTableJson && tile.batchTableJson.extensions && tile.batchTableJson.extensions["3DTILES_draco_point_compression"];
    if (batchTableDraco) {
      dracoBatchTableProperties = batchTableDraco.properties;
    }
    const featureTableDraco = featureTable.getExtension("3DTILES_draco_point_compression");
    if (featureTableDraco) {
      dracoFeatureTableProperties = featureTableDraco.properties;
      const dracoByteOffset = featureTableDraco.byteOffset;
      const dracoByteLength = featureTableDraco.byteLength;
      if (!dracoFeatureTableProperties || !Number.isFinite(dracoByteOffset) || !dracoByteLength) {
        throw new Error("Draco properties, byteOffset, and byteLength must be defined");
      }
      dracoBuffer = tile.featureTableBinary.slice(dracoByteOffset, dracoByteOffset + dracoByteLength);
      tile.hasPositions = Number.isFinite(dracoFeatureTableProperties.POSITION);
      tile.hasColors = Number.isFinite(dracoFeatureTableProperties.RGB) || Number.isFinite(dracoFeatureTableProperties.RGBA);
      tile.hasNormals = Number.isFinite(dracoFeatureTableProperties.NORMAL);
      tile.hasBatchIds = Number.isFinite(dracoFeatureTableProperties.BATCH_ID);
      tile.isTranslucent = Number.isFinite(dracoFeatureTableProperties.RGBA);
    }
    if (!dracoBuffer) {
      return true;
    }
    const dracoData = {
      buffer: dracoBuffer,
      properties: { ...dracoFeatureTableProperties, ...dracoBatchTableProperties },
      featureTableProperties: dracoFeatureTableProperties,
      batchTableProperties: dracoBatchTableProperties,
      dequantizeInShader: false
    };
    return await loadDraco(tile, dracoData, options, context);
  }