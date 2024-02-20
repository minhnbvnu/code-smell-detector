function decodeQuantizedPositions(tile, positions) {
    const scratchPosition2 = new Vector3();
    const decodedArray = new Float32Array(tile.pointCount * 3);
    for (let i2 = 0; i2 < tile.pointCount; i2++) {
      scratchPosition2.set(positions[i2 * 3], positions[i2 * 3 + 1], positions[i2 * 3 + 2]).scale(1 / tile.quantizedRange).multiply(tile.quantizedVolumeScale).add(tile.quantizedVolumeOffset).toArray(decodedArray, i2 * 3);
    }
    return decodedArray;
  }