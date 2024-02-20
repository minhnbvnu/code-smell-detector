async function normalizeImplicitTileData(tile, rootSubtree, options) {
    if (!tile) {
      return null;
    }
    tile.lodMetricType = LOD_METRIC_TYPE.GEOMETRIC_ERROR;
    tile.lodMetricValue = tile.geometricError;
    tile.transformMatrix = tile.transform;
    const { children, contentUrl } = await parseImplicitTiles(rootSubtree, options);
    if (contentUrl) {
      tile.contentUrl = contentUrl;
      tile.content = { uri: contentUrl.replace(`${options.basePath}/`, "") };
    }
    tile.refine = getRefine(tile.refine);
    tile.type = getTileType(tile);
    tile.children = children;
    tile.id = tile.contentUrl;
    return tile;
  }