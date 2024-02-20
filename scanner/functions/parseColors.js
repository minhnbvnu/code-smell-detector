function parseColors(tile, featureTable, batchTable) {
    if (!tile.attributes.colors) {
      let colors = null;
      if (featureTable.hasProperty("RGBA")) {
        colors = featureTable.getPropertyArray("RGBA", GL2.UNSIGNED_BYTE, 4);
        tile.isTranslucent = true;
      } else if (featureTable.hasProperty("RGB")) {
        colors = featureTable.getPropertyArray("RGB", GL2.UNSIGNED_BYTE, 3);
      } else if (featureTable.hasProperty("RGB565")) {
        colors = featureTable.getPropertyArray("RGB565", GL2.UNSIGNED_SHORT, 1);
        tile.isRGB565 = true;
      }
      tile.attributes.colors = normalize3DTileColorAttribute(tile, colors, batchTable);
    }
    if (featureTable.hasProperty("CONSTANT_RGBA")) {
      tile.constantRGBA = featureTable.getGlobalProperty("CONSTANT_RGBA", GL2.UNSIGNED_BYTE, 4);
    }
  }