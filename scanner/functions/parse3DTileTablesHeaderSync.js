function parse3DTileTablesHeaderSync(tile, arrayBuffer, byteOffset) {
    const view = new DataView(arrayBuffer);
    let batchLength;
    tile.header = tile.header || {};
    let featureTableJsonByteLength = view.getUint32(byteOffset, true);
    byteOffset += SIZEOF_UINT322;
    let featureTableBinaryByteLength = view.getUint32(byteOffset, true);
    byteOffset += SIZEOF_UINT322;
    let batchTableJsonByteLength = view.getUint32(byteOffset, true);
    byteOffset += SIZEOF_UINT322;
    let batchTableBinaryByteLength = view.getUint32(byteOffset, true);
    byteOffset += SIZEOF_UINT322;
    if (batchTableJsonByteLength >= 570425344) {
      byteOffset -= SIZEOF_UINT322 * 2;
      batchLength = featureTableJsonByteLength;
      batchTableJsonByteLength = featureTableBinaryByteLength;
      batchTableBinaryByteLength = 0;
      featureTableJsonByteLength = 0;
      featureTableBinaryByteLength = 0;
      console.warn(DEPRECATION_WARNING);
    } else if (batchTableBinaryByteLength >= 570425344) {
      byteOffset -= SIZEOF_UINT322;
      batchLength = batchTableJsonByteLength;
      batchTableJsonByteLength = featureTableJsonByteLength;
      batchTableBinaryByteLength = featureTableBinaryByteLength;
      featureTableJsonByteLength = 0;
      featureTableBinaryByteLength = 0;
      console.warn(DEPRECATION_WARNING);
    }
    tile.header.featureTableJsonByteLength = featureTableJsonByteLength;
    tile.header.featureTableBinaryByteLength = featureTableBinaryByteLength;
    tile.header.batchTableJsonByteLength = batchTableJsonByteLength;
    tile.header.batchTableBinaryByteLength = batchTableBinaryByteLength;
    tile.header.batchLength = batchLength;
    return byteOffset;
  }