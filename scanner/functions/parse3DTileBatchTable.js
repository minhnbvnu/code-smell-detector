function parse3DTileBatchTable(tile, arrayBuffer, byteOffset, options) {
    const { batchTableJsonByteLength, batchTableBinaryByteLength } = tile.header;
    if (batchTableJsonByteLength > 0) {
      const batchTableString = getStringFromArrayBuffer(arrayBuffer, byteOffset, batchTableJsonByteLength);
      tile.batchTableJson = JSON.parse(batchTableString);
      byteOffset += batchTableJsonByteLength;
      if (batchTableBinaryByteLength > 0) {
        tile.batchTableBinary = new Uint8Array(arrayBuffer, byteOffset, batchTableBinaryByteLength);
        tile.batchTableBinary = new Uint8Array(tile.batchTableBinary);
        byteOffset += batchTableBinaryByteLength;
      }
    }
    return byteOffset;
  }