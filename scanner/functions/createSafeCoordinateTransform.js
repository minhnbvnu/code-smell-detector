function createSafeCoordinateTransform(sourceProj, destProj, transform) {
  return function (coord) {
    let transformed, worldsAway;
    if (sourceProj.canWrapX()) {
      const sourceExtent = sourceProj.getExtent();
      const sourceExtentWidth = getWidth(sourceExtent);
      coord = coord.slice(0);
      worldsAway = getWorldsAway(coord, sourceProj, sourceExtentWidth);
      if (worldsAway) {
        // Move x to the real world
        coord[0] = coord[0] - worldsAway * sourceExtentWidth;
      }
      coord[0] = clamp(coord[0], sourceExtent[0], sourceExtent[2]);
      coord[1] = clamp(coord[1], sourceExtent[1], sourceExtent[3]);
      transformed = transform(coord);
    } else {
      transformed = transform(coord);
    }
    if (worldsAway && destProj.canWrapX()) {
      // Move transformed coordinate back to the offset world
      transformed[0] += worldsAway * getWidth(destProj.getExtent());
    }
    return transformed;
  };
}