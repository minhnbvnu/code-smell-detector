function calculateBoundingVolumeForChildTile(level, rootBoundingVolume, childCoordinates) {
    if (rootBoundingVolume.region) {
      const { childTileX, childTileY, childTileZ } = childCoordinates;
      const [west, south, east, north, minimumHeight, maximumHeight] = rootBoundingVolume.region;
      const boundingVolumesCount = 2 ** level;
      const sizeX = (east - west) / boundingVolumesCount;
      const sizeY = (north - south) / boundingVolumesCount;
      const sizeZ = (maximumHeight - minimumHeight) / boundingVolumesCount;
      const [childWest, childEast] = [west + sizeX * childTileX, west + sizeX * (childTileX + 1)];
      const [childSouth, childNorth] = [south + sizeY * childTileY, south + sizeY * (childTileY + 1)];
      const [childMinimumHeight, childMaximumHeight] = [
        minimumHeight + sizeZ * childTileZ,
        minimumHeight + sizeZ * (childTileZ + 1)
      ];
      return {
        region: [childWest, childSouth, childEast, childNorth, childMinimumHeight, childMaximumHeight]
      };
    }
    console.warn("Unsupported bounding volume type: ", rootBoundingVolume);
    return null;
  }