async function loadDraco(tile, dracoData, options, context) {
    const { parse: parse5 } = context;
    const dracoOptions = {
      ...options,
      draco: {
        ...options.draco,
        extraAttributes: dracoData.batchTableProperties || {}
      }
    };
    delete dracoOptions["3d-tiles"];
    const data = await parse5(dracoData.buffer, DracoLoader2, dracoOptions);
    const decodedPositions = data.attributes.POSITION && data.attributes.POSITION.value;
    const decodedColors = data.attributes.COLOR_0 && data.attributes.COLOR_0.value;
    const decodedNormals = data.attributes.NORMAL && data.attributes.NORMAL.value;
    const decodedBatchIds = data.attributes.BATCH_ID && data.attributes.BATCH_ID.value;
    const isQuantizedDraco = decodedPositions && data.attributes.POSITION.value.quantization;
    const isOctEncodedDraco = decodedNormals && data.attributes.NORMAL.value.quantization;
    if (isQuantizedDraco) {
      const quantization = data.POSITION.data.quantization;
      const range = quantization.range;
      tile.quantizedVolumeScale = new Vector3(range, range, range);
      tile.quantizedVolumeOffset = new Vector3(quantization.minValues);
      tile.quantizedRange = (1 << quantization.quantizationBits) - 1;
      tile.isQuantizedDraco = true;
    }
    if (isOctEncodedDraco) {
      tile.octEncodedRange = (1 << data.NORMAL.data.quantization.quantizationBits) - 1;
      tile.isOctEncodedDraco = true;
    }
    const batchTableAttributes = {};
    if (dracoData.batchTableProperties) {
      for (const attributeName of Object.keys(dracoData.batchTableProperties)) {
        if (data.attributes[attributeName] && data.attributes[attributeName].value) {
          batchTableAttributes[attributeName.toLowerCase()] = data.attributes[attributeName].value;
        }
      }
    }
    tile.attributes = {
      positions: decodedPositions,
      colors: normalize3DTileColorAttribute(tile, decodedColors, void 0),
      normals: decodedNormals,
      batchIds: decodedBatchIds,
      ...batchTableAttributes
    };
  }