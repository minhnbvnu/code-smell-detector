async function parseBatchedModel3DTile(tile, arrayBuffer, byteOffset, options, context) {
    byteOffset = parseBatchedModel(tile, arrayBuffer, byteOffset, options, context);
    await extractGLTF(tile, GLTF_FORMAT.EMBEDDED, options, context);
    const extensions = tile?.gltf?.extensions;
    if (extensions && extensions.CESIUM_RTC) {
      tile.rtcCenter = extensions.CESIUM_RTC.center;
    }
    return byteOffset;
  }