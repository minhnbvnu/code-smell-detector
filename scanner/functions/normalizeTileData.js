function normalizeTileData(tile, options) {
    if (!tile) {
      return null;
    }
    if (tile.content) {
      const contentUri = tile.content.uri || tile.content.url;
      tile.contentUrl = `${options.basePath}/${contentUri}`;
    }
    tile.id = tile.contentUrl;
    tile.lodMetricType = LOD_METRIC_TYPE.GEOMETRIC_ERROR;
    tile.lodMetricValue = tile.geometricError;
    tile.transformMatrix = tile.transform;
    tile.type = getTileType(tile);
    tile.refine = getRefine(tile.refine);
    return tile;
  }