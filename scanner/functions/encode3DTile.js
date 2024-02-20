function encode3DTile(tile, options) {
    const byteLength = encode3DTileToDataView(tile, null, 0, options);
    const arrayBuffer = new ArrayBuffer(byteLength);
    const dataView = new DataView(arrayBuffer);
    encode3DTileToDataView(tile, dataView, 0, options);
    return arrayBuffer;
  }