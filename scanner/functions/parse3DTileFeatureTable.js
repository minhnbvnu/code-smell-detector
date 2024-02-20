function parse3DTileFeatureTable(tile, arrayBuffer, byteOffset, options) {
    const { featureTableJsonByteLength, featureTableBinaryByteLength, batchLength } = tile.header;
    tile.featureTableJson = {
      BATCH_LENGTH: batchLength || 0
    };
    if (featureTableJsonByteLength > 0) {
      const featureTableString = getStringFromArrayBuffer(arrayBuffer, byteOffset, featureTableJsonByteLength);
      tile.featureTableJson = JSON.parse(featureTableString);
    }
    byteOffset += featureTableJsonByteLength;
    tile.featureTableBinary = new Uint8Array(arrayBuffer, byteOffset, featureTableBinaryByteLength);
    byteOffset += featureTableBinaryByteLength;
    return byteOffset;
  }