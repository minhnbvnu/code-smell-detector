function formatTileData(tile, level, childCoordinates, options) {
    const {
      basePath,
      refine,
      getRefine: getRefine2,
      lodMetricType,
      getTileType: getTileType2,
      rootLodMetricValue,
      rootBoundingVolume
    } = options;
    const uri = tile.contentUrl && tile.contentUrl.replace(`${basePath}/`, "");
    const lodMetricValue = rootLodMetricValue / 2 ** level;
    const boundingVolume = calculateBoundingVolumeForChildTile(level, rootBoundingVolume, childCoordinates);
    return {
      children: tile.children,
      contentUrl: tile.contentUrl,
      content: { uri },
      id: tile.contentUrl,
      refine: getRefine2(refine),
      type: getTileType2(tile),
      lodMetricType,
      lodMetricValue,
      boundingVolume
    };
  }