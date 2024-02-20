async function parseTileset(data, options, context) {
    const tilesetJson = JSON.parse(new TextDecoder().decode(data));
    tilesetJson.loader = options.loader || Tiles3DLoader;
    tilesetJson.url = context.url;
    tilesetJson.basePath = getBaseUri(tilesetJson);
    tilesetJson.root = hasImplicitTilingExtension(tilesetJson) ? await normalizeImplicitTileHeaders(tilesetJson) : normalizeTileHeaders(tilesetJson);
    tilesetJson.type = TILESET_TYPE.TILES3D;
    tilesetJson.lodMetricType = LOD_METRIC_TYPE.GEOMETRIC_ERROR;
    tilesetJson.lodMetricValue = tilesetJson.root?.lodMetricValue || 0;
    return tilesetJson;
  }