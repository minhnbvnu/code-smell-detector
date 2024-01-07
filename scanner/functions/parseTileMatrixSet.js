function parseTileMatrixSet(
  sourceInfo,
  tileMatrixSet,
  tileUrlTemplate,
  tileMatrixSetLimits,
) {
  let projection = sourceInfo.projection;
  if (!projection) {
    projection = getProjection(tileMatrixSet.crs);
    if (!projection) {
      throw new Error(`Unsupported CRS: ${tileMatrixSet.crs}`);
    }
  }
  const backwards = projection.getAxisOrientation().substr(0, 2) !== 'en';

  const matrices = tileMatrixSet.tileMatrices;

  /**
   * @type {Object<string, TileMatrix>}
   */
  const matrixLookup = {};
  for (let i = 0; i < matrices.length; ++i) {
    const matrix = matrices[i];
    matrixLookup[matrix.id] = matrix;
  }

  /**
   * @type {Object<string, TileMatrixSetLimit>}
   */
  const limitLookup = {};

  /**
   * @type {Array<string>}
   */
  const matrixIds = [];

  if (tileMatrixSetLimits) {
    for (let i = 0; i < tileMatrixSetLimits.length; ++i) {
      const limit = tileMatrixSetLimits[i];
      const id = limit.tileMatrix;
      matrixIds.push(id);
      limitLookup[id] = limit;
    }
  } else {
    for (let i = 0; i < matrices.length; ++i) {
      const id = matrices[i].id;
      matrixIds.push(id);
    }
  }

  const length = matrixIds.length;
  const origins = new Array(length);
  const resolutions = new Array(length);
  const sizes = new Array(length);
  const tileSizes = new Array(length);
  const extent = [-Infinity, -Infinity, Infinity, Infinity];

  for (let i = 0; i < length; ++i) {
    const id = matrixIds[i];
    const matrix = matrixLookup[id];
    const origin = matrix.pointOfOrigin;
    if (backwards) {
      origins[i] = [origin[1], origin[0]];
    } else {
      origins[i] = origin;
    }
    resolutions[i] = matrix.cellSize;
    sizes[i] = [matrix.matrixWidth, matrix.matrixHeight];
    tileSizes[i] = [matrix.tileWidth, matrix.tileHeight];
    const limit = limitLookup[id];
    if (limit) {
      const tileMapWidth = matrix.cellSize * matrix.tileWidth;
      const minX = origins[i][0] + limit.minTileCol * tileMapWidth;
      const maxX = origins[i][0] + (limit.maxTileCol + 1) * tileMapWidth;

      const tileMapHeight = matrix.cellSize * matrix.tileHeight;
      const upsideDown = matrix.cornerOfOrigin === 'bottomLeft';

      let minY;
      let maxY;
      if (upsideDown) {
        minY = origins[i][1] + limit.minTileRow * tileMapHeight;
        maxY = origins[i][1] + (limit.maxTileRow + 1) * tileMapHeight;
      } else {
        minY = origins[i][1] - (limit.maxTileRow + 1) * tileMapHeight;
        maxY = origins[i][1] - limit.minTileRow * tileMapHeight;
      }

      intersectExtents(extent, [minX, minY, maxX, maxY], extent);
    }
  }

  const tileGrid = new TileGrid({
    origins: origins,
    resolutions: resolutions,
    sizes: sizes,
    tileSizes: tileSizes,
    extent: tileMatrixSetLimits ? extent : undefined,
  });

  const context = sourceInfo.context;
  const base = sourceInfo.url;

  /** @type {import('../Tile.js').UrlFunction} */
  function tileUrlFunction(tileCoord, pixelRatio, projection) {
    if (!tileCoord) {
      return undefined;
    }

    const id = matrixIds[tileCoord[0]];
    const matrix = matrixLookup[id];
    const upsideDown = matrix.cornerOfOrigin === 'bottomLeft';

    const localContext = {
      tileMatrix: id,
      tileCol: tileCoord[1],
      tileRow: upsideDown ? -tileCoord[2] - 1 : tileCoord[2],
    };

    if (tileMatrixSetLimits) {
      const limit = limitLookup[matrix.id];
      if (
        localContext.tileCol < limit.minTileCol ||
        localContext.tileCol > limit.maxTileCol ||
        localContext.tileRow < limit.minTileRow ||
        localContext.tileRow > limit.maxTileRow
      ) {
        return undefined;
      }
    }

    Object.assign(localContext, context);

    const url = tileUrlTemplate.replace(/\{(\w+?)\}/g, function (m, p) {
      return localContext[p];
    });

    return resolveUrl(base, url);
  }

  return {
    grid: tileGrid,
    urlTemplate: tileUrlTemplate,
    urlFunction: tileUrlFunction,
  };
}