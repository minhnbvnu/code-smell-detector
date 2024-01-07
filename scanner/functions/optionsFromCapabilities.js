function optionsFromCapabilities(wmtsCap, config) {
  const layers = wmtsCap['Contents']['Layer'];
  const l = layers.find(function (elt) {
    return elt['Identifier'] == config['layer'];
  });
  if (!l) {
    return null;
  }
  const tileMatrixSets = wmtsCap['Contents']['TileMatrixSet'];
  let idx;
  if (l['TileMatrixSetLink'].length > 1) {
    if ('projection' in config) {
      idx = l['TileMatrixSetLink'].findIndex(function (elt) {
        const tileMatrixSet = tileMatrixSets.find(function (el) {
          return el['Identifier'] == elt['TileMatrixSet'];
        });
        const supportedCRS = tileMatrixSet['SupportedCRS'];
        const proj1 = getProjection(supportedCRS);
        const proj2 = getProjection(config['projection']);
        if (proj1 && proj2) {
          return equivalent(proj1, proj2);
        }
        return supportedCRS == config['projection'];
      });
    } else {
      idx = l['TileMatrixSetLink'].findIndex(function (elt) {
        return elt['TileMatrixSet'] == config['matrixSet'];
      });
    }
  } else {
    idx = 0;
  }
  if (idx < 0) {
    idx = 0;
  }
  const matrixSet =
    /** @type {string} */
    (l['TileMatrixSetLink'][idx]['TileMatrixSet']);
  const matrixLimits =
    /** @type {Array<Object>} */
    (l['TileMatrixSetLink'][idx]['TileMatrixSetLimits']);

  let format = /** @type {string} */ (l['Format'][0]);
  if ('format' in config) {
    format = config['format'];
  }
  idx = l['Style'].findIndex(function (elt) {
    if ('style' in config) {
      return elt['Title'] == config['style'];
    }
    return elt['isDefault'];
  });
  if (idx < 0) {
    idx = 0;
  }
  const style = /** @type {string} */ (l['Style'][idx]['Identifier']);

  const dimensions = {};
  if ('Dimension' in l) {
    l['Dimension'].forEach(function (elt, index, array) {
      const key = elt['Identifier'];
      let value = elt['Default'];
      if (value === undefined) {
        value = elt['Value'][0];
      }
      dimensions[key] = value;
    });
  }

  const matrixSets = wmtsCap['Contents']['TileMatrixSet'];
  const matrixSetObj = matrixSets.find(function (elt) {
    return elt['Identifier'] == matrixSet;
  });

  let projection;
  const code = matrixSetObj['SupportedCRS'];
  if (code) {
    projection = getProjection(code);
  }
  if ('projection' in config) {
    const projConfig = getProjection(config['projection']);
    if (projConfig) {
      if (!projection || equivalent(projConfig, projection)) {
        projection = projConfig;
      }
    }
  }

  let wrapX = false;
  const switchXY = projection.getAxisOrientation().substr(0, 2) == 'ne';

  let matrix = matrixSetObj.TileMatrix[0];

  // create default matrixLimit
  let selectedMatrixLimit = {
    MinTileCol: 0,
    MinTileRow: 0,
    // subtract one to end up at tile top left
    MaxTileCol: matrix.MatrixWidth - 1,
    MaxTileRow: matrix.MatrixHeight - 1,
  };

  //in case of matrix limits, use matrix limits to calculate extent
  if (matrixLimits) {
    selectedMatrixLimit = matrixLimits[matrixLimits.length - 1];
    const m = matrixSetObj.TileMatrix.find(
      (tileMatrixValue) =>
        tileMatrixValue.Identifier === selectedMatrixLimit.TileMatrix ||
        matrixSetObj.Identifier + ':' + tileMatrixValue.Identifier ===
          selectedMatrixLimit.TileMatrix,
    );
    if (m) {
      matrix = m;
    }
  }

  const resolution =
    (matrix.ScaleDenominator * 0.00028) / projection.getMetersPerUnit(); // WMTS 1.0.0: standardized rendering pixel size
  const origin = switchXY
    ? [matrix.TopLeftCorner[1], matrix.TopLeftCorner[0]]
    : matrix.TopLeftCorner;
  const tileSpanX = matrix.TileWidth * resolution;
  const tileSpanY = matrix.TileHeight * resolution;
  let matrixSetExtent = matrixSetObj['BoundingBox'];
  if (matrixSetExtent && switchXY) {
    matrixSetExtent = [
      matrixSetExtent[1],
      matrixSetExtent[0],
      matrixSetExtent[3],
      matrixSetExtent[2],
    ];
  }
  let extent = [
    origin[0] + tileSpanX * selectedMatrixLimit.MinTileCol,
    // add one to get proper bottom/right coordinate
    origin[1] - tileSpanY * (1 + selectedMatrixLimit.MaxTileRow),
    origin[0] + tileSpanX * (1 + selectedMatrixLimit.MaxTileCol),
    origin[1] - tileSpanY * selectedMatrixLimit.MinTileRow,
  ];

  if (
    matrixSetExtent !== undefined &&
    !containsExtent(matrixSetExtent, extent)
  ) {
    const wgs84BoundingBox = l['WGS84BoundingBox'];
    const wgs84ProjectionExtent = getProjection('EPSG:4326').getExtent();
    extent = matrixSetExtent;
    if (wgs84BoundingBox) {
      wrapX =
        wgs84BoundingBox[0] === wgs84ProjectionExtent[0] &&
        wgs84BoundingBox[2] === wgs84ProjectionExtent[2];
    } else {
      const wgs84MatrixSetExtent = transformExtent(
        matrixSetExtent,
        matrixSetObj['SupportedCRS'],
        'EPSG:4326',
      );
      // Ignore slight deviation from the correct x limits
      wrapX =
        wgs84MatrixSetExtent[0] - 1e-10 <= wgs84ProjectionExtent[0] &&
        wgs84MatrixSetExtent[2] + 1e-10 >= wgs84ProjectionExtent[2];
    }
  }

  const tileGrid = createFromCapabilitiesMatrixSet(
    matrixSetObj,
    extent,
    matrixLimits,
  );

  /** @type {!Array<string>} */
  const urls = [];
  let requestEncoding = config['requestEncoding'];
  requestEncoding = requestEncoding !== undefined ? requestEncoding : '';

  if (
    'OperationsMetadata' in wmtsCap &&
    'GetTile' in wmtsCap['OperationsMetadata']
  ) {
    const gets = wmtsCap['OperationsMetadata']['GetTile']['DCP']['HTTP']['Get'];

    for (let i = 0, ii = gets.length; i < ii; ++i) {
      if (gets[i]['Constraint']) {
        const constraint = gets[i]['Constraint'].find(function (element) {
          return element['name'] == 'GetEncoding';
        });
        const encodings = constraint['AllowedValues']['Value'];

        if (requestEncoding === '') {
          // requestEncoding not provided, use the first encoding from the list
          requestEncoding = encodings[0];
        }
        if (requestEncoding === 'KVP') {
          if (encodings.includes('KVP')) {
            urls.push(/** @type {string} */ (gets[i]['href']));
          }
        } else {
          break;
        }
      } else if (gets[i]['href']) {
        requestEncoding = 'KVP';
        urls.push(/** @type {string} */ (gets[i]['href']));
      }
    }
  }
  if (urls.length === 0) {
    requestEncoding = 'REST';
    l['ResourceURL'].forEach(function (element) {
      if (element['resourceType'] === 'tile') {
        format = element['format'];
        urls.push(/** @type {string} */ (element['template']));
      }
    });
  }

  return {
    urls: urls,
    layer: config['layer'],
    matrixSet: matrixSet,
    format: format,
    projection: projection,
    requestEncoding: requestEncoding,
    tileGrid: tileGrid,
    style: style,
    dimensions: dimensions,
    wrapX: wrapX,
    crossOrigin: config['crossOrigin'],
  };
}