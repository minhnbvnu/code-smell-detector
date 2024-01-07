function parseTileSetMetadata(sourceInfo, tileSet) {
  const tileMatrixSetLimits = tileSet.tileMatrixSetLimits;
  /** @type {string} */
  let tileUrlTemplate;

  if (tileSet.dataType === 'map') {
    tileUrlTemplate = getMapTileUrlTemplate(
      tileSet.links,
      sourceInfo.mediaType,
    );
  } else if (tileSet.dataType === 'vector') {
    tileUrlTemplate = getVectorTileUrlTemplate(
      tileSet.links,
      sourceInfo.mediaType,
      sourceInfo.supportedMediaTypes,
    );
  } else {
    throw new Error('Expected tileset data type to be "map" or "vector"');
  }

  if (tileSet.tileMatrixSet) {
    return parseTileMatrixSet(
      sourceInfo,
      tileSet.tileMatrixSet,
      tileUrlTemplate,
      tileMatrixSetLimits,
    );
  }

  const tileMatrixSetLink = tileSet.links.find(
    (link) =>
      link.rel === 'http://www.opengis.net/def/rel/ogc/1.0/tiling-scheme',
  );
  if (!tileMatrixSetLink) {
    throw new Error(
      'Expected http://www.opengis.net/def/rel/ogc/1.0/tiling-scheme link or tileMatrixSet',
    );
  }
  const tileMatrixSetDefinition = tileMatrixSetLink.href;

  const url = resolveUrl(sourceInfo.url, tileMatrixSetDefinition);
  return getJSON(url).then(function (tileMatrixSet) {
    return parseTileMatrixSet(
      sourceInfo,
      tileMatrixSet,
      tileUrlTemplate,
      tileMatrixSetLimits,
    );
  });
}