function parseNormals(tile, featureTable) {
    if (!tile.attributes.normals) {
      let normals = null;
      if (featureTable.hasProperty("NORMAL")) {
        normals = featureTable.getPropertyArray("NORMAL", GL2.FLOAT, 3);
      } else if (featureTable.hasProperty("NORMAL_OCT16P")) {
        normals = featureTable.getPropertyArray("NORMAL_OCT16P", GL2.UNSIGNED_BYTE, 2);
        tile.isOctEncoded16P = true;
      }
      tile.attributes.normals = normalize3DTileNormalAttribute(tile, normals);
    }
  }