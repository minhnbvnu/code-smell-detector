async function normalizeImplicitTileHeaders(tileset) {
    if (!tileset.root) {
      return null;
    }
    const basePath = tileset.basePath;
    const implicitTilingExtension = tileset.root.extensions["3DTILES_implicit_tiling"];
    const {
      subdivisionScheme,
      maximumLevel,
      subtreeLevels,
      subtrees: { uri: subtreesUriTemplate }
    } = implicitTilingExtension;
    const subtreeUrl = replaceContentUrlTemplate(subtreesUriTemplate, 0, 0, 0, 0);
    const rootSubtreeUrl = `${basePath}/${subtreeUrl}`;
    const rootSubtree = await load(rootSubtreeUrl, Tile3DSubtreeLoader);
    const contentUrlTemplate = `${basePath}/${tileset.root.content.uri}`;
    const refine = tileset.root.refine;
    const rootLodMetricValue = tileset.root.geometricError;
    const rootBoundingVolume = tileset.root.boundingVolume;
    const options = {
      contentUrlTemplate,
      subtreesUriTemplate,
      subdivisionScheme,
      subtreeLevels,
      maximumLevel,
      refine,
      basePath,
      lodMetricType: LOD_METRIC_TYPE.GEOMETRIC_ERROR,
      rootLodMetricValue,
      rootBoundingVolume,
      getTileType,
      getRefine
    };
    return await normalizeImplicitTileData(tileset.root, rootSubtree, options);
  }