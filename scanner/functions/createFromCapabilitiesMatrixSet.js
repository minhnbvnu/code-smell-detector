function createFromCapabilitiesMatrixSet(
  matrixSet,
  extent,
  matrixLimits,
) {
  /** @type {!Array<number>} */
  const resolutions = [];
  /** @type {!Array<string>} */
  const matrixIds = [];
  /** @type {!Array<import("../coordinate.js").Coordinate>} */
  const origins = [];
  /** @type {!Array<number|import("../size.js").Size>} */
  const tileSizes = [];
  /** @type {!Array<import("../size.js").Size>} */
  const sizes = [];

  matrixLimits = matrixLimits !== undefined ? matrixLimits : [];

  const supportedCRSPropName = 'SupportedCRS';
  const matrixIdsPropName = 'TileMatrix';
  const identifierPropName = 'Identifier';
  const scaleDenominatorPropName = 'ScaleDenominator';
  const topLeftCornerPropName = 'TopLeftCorner';
  const tileWidthPropName = 'TileWidth';
  const tileHeightPropName = 'TileHeight';

  const code = matrixSet[supportedCRSPropName];
  const projection = getProjection(code);
  const metersPerUnit = projection.getMetersPerUnit();
  // swap origin x and y coordinates if axis orientation is lat/long
  const switchOriginXY = projection.getAxisOrientation().substr(0, 2) == 'ne';

  matrixSet[matrixIdsPropName].sort(function (a, b) {
    return b[scaleDenominatorPropName] - a[scaleDenominatorPropName];
  });

  matrixSet[matrixIdsPropName].forEach(function (elt) {
    let matrixAvailable;
    // use of matrixLimits to filter TileMatrices from GetCapabilities
    // TileMatrixSet from unavailable matrix levels.
    if (matrixLimits.length > 0) {
      matrixAvailable = matrixLimits.find(function (elt_ml) {
        if (elt[identifierPropName] == elt_ml[matrixIdsPropName]) {
          return true;
        }
        // Fallback for tileMatrix identifiers that don't get prefixed
        // by their tileMatrixSet identifiers.
        if (!elt[identifierPropName].includes(':')) {
          return (
            matrixSet[identifierPropName] + ':' + elt[identifierPropName] ===
            elt_ml[matrixIdsPropName]
          );
        }
        return false;
      });
    } else {
      matrixAvailable = true;
    }

    if (matrixAvailable) {
      matrixIds.push(elt[identifierPropName]);
      const resolution =
        (elt[scaleDenominatorPropName] * 0.28e-3) / metersPerUnit;
      const tileWidth = elt[tileWidthPropName];
      const tileHeight = elt[tileHeightPropName];
      if (switchOriginXY) {
        origins.push([
          elt[topLeftCornerPropName][1],
          elt[topLeftCornerPropName][0],
        ]);
      } else {
        origins.push(elt[topLeftCornerPropName]);
      }
      resolutions.push(resolution);
      tileSizes.push(
        tileWidth == tileHeight ? tileWidth : [tileWidth, tileHeight],
      );
      sizes.push([elt['MatrixWidth'], elt['MatrixHeight']]);
    }
  });

  return new WMTSTileGrid({
    extent: extent,
    origins: origins,
    resolutions: resolutions,
    matrixIds: matrixIds,
    tileSizes: tileSizes,
    sizes: sizes,
  });
}