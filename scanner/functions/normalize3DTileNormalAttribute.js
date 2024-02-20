function normalize3DTileNormalAttribute(tile, normals) {
    if (!normals) {
      return null;
    }
    if (tile.isOctEncoded16P) {
      const decodedArray = new Float32Array(tile.pointsLength * 3);
      for (let i2 = 0; i2 < tile.pointsLength; i2++) {
        octDecode(normals[i2 * 2], normals[i2 * 2 + 1], scratchNormal2);
        scratchNormal2.toArray(decodedArray, i2 * 3);
      }
      return {
        type: GL2.FLOAT,
        size: 2,
        value: decodedArray
      };
    }
    return {
      type: GL2.FLOAT,
      size: 2,
      value: normals
    };
  }