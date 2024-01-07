constructor(options) {
    const size = options.size;
    const tierSizeCalculation =
      options.tierSizeCalculation !== undefined
        ? options.tierSizeCalculation
        : 'default';

    const tilePixelRatio = options.tilePixelRatio || 1;
    const imageWidth = size[0];
    const imageHeight = size[1];
    const tierSizeInTiles = [];
    const tileSize = options.tileSize || DEFAULT_TILE_SIZE;
    let tileSizeForTierSizeCalculation = tileSize * tilePixelRatio;

    switch (tierSizeCalculation) {
      case 'default':
        while (
          imageWidth > tileSizeForTierSizeCalculation ||
          imageHeight > tileSizeForTierSizeCalculation
        ) {
          tierSizeInTiles.push([
            Math.ceil(imageWidth / tileSizeForTierSizeCalculation),
            Math.ceil(imageHeight / tileSizeForTierSizeCalculation),
          ]);
          tileSizeForTierSizeCalculation += tileSizeForTierSizeCalculation;
        }
        break;
      case 'truncated':
        let width = imageWidth;
        let height = imageHeight;
        while (
          width > tileSizeForTierSizeCalculation ||
          height > tileSizeForTierSizeCalculation
        ) {
          tierSizeInTiles.push([
            Math.ceil(width / tileSizeForTierSizeCalculation),
            Math.ceil(height / tileSizeForTierSizeCalculation),
          ]);
          width >>= 1;
          height >>= 1;
        }
        break;
      default:
        throw new Error('Unknown `tierSizeCalculation` configured');
    }

    tierSizeInTiles.push([1, 1]);
    tierSizeInTiles.reverse();

    const resolutions = [tilePixelRatio];
    const tileCountUpToTier = [0];
    for (let i = 1, ii = tierSizeInTiles.length; i < ii; i++) {
      resolutions.push(tilePixelRatio << i);
      tileCountUpToTier.push(
        tierSizeInTiles[i - 1][0] * tierSizeInTiles[i - 1][1] +
          tileCountUpToTier[i - 1],
      );
    }
    resolutions.reverse();

    const tileGrid = new TileGrid({
      tileSize: tileSize,
      extent: options.extent || [0, -imageHeight, imageWidth, 0],
      resolutions: resolutions,
    });

    let url = options.url;
    if (url && !url.includes('{TileGroup}') && !url.includes('{tileIndex}')) {
      url += '{TileGroup}/{z}-{x}-{y}.jpg';
    }
    const urls = expandUrl(url);

    let tileWidth = tileSize * tilePixelRatio;

    /**
     * @param {string} template Template.
     * @return {import("../Tile.js").UrlFunction} Tile URL function.
     */
    function createFromTemplate(template) {
      return (
        /**
         * @param {import("../tilecoord.js").TileCoord} tileCoord Tile Coordinate.
         * @param {number} pixelRatio Pixel ratio.
         * @param {import("../proj/Projection.js").default} projection Projection.
         * @return {string|undefined} Tile URL.
         */
        function (tileCoord, pixelRatio, projection) {
          if (!tileCoord) {
            return undefined;
          }
          const tileCoordZ = tileCoord[0];
          const tileCoordX = tileCoord[1];
          const tileCoordY = tileCoord[2];
          const tileIndex =
            tileCoordX + tileCoordY * tierSizeInTiles[tileCoordZ][0];
          const tileGroup =
            ((tileIndex + tileCountUpToTier[tileCoordZ]) / tileWidth) | 0;
          const localContext = {
            'z': tileCoordZ,
            'x': tileCoordX,
            'y': tileCoordY,
            'tileIndex': tileIndex,
            'TileGroup': 'TileGroup' + tileGroup,
          };
          return template.replace(/\{(\w+?)\}/g, function (m, p) {
            return localContext[p];
          });
        }
      );
    }

    const tileUrlFunction = createFromTileUrlFunctions(
      urls.map(createFromTemplate),
    );

    const ZoomifyTileClass = CustomTile.bind(
      null,
      toSize(tileSize * tilePixelRatio),
    );

    super({
      attributions: options.attributions,
      cacheSize: options.cacheSize,
      crossOrigin: options.crossOrigin,
      interpolate: options.interpolate,
      projection: options.projection,
      tilePixelRatio: tilePixelRatio,
      reprojectionErrorThreshold: options.reprojectionErrorThreshold,
      tileClass: ZoomifyTileClass,
      tileGrid: tileGrid,
      tileUrlFunction: tileUrlFunction,
      transition: options.transition,
    });

    /**
     * @type {number|import("../array.js").NearestDirectionFunction}
     */
    this.zDirection = options.zDirection;

    // Server retina tile detection (non-standard):
    // Try loading the center tile for the highest resolution. If it is not
    // available, we are dealing with retina tiles, and need to adjust the
    // tile url calculation.
    const tileUrl = tileGrid.getTileCoordForCoordAndResolution(
      getCenter(tileGrid.getExtent()),
      resolutions[resolutions.length - 1],
    );
    const testTileUrl = tileUrlFunction(tileUrl, 1, null);
    const image = new Image();
    image.addEventListener('error', () => {
      tileWidth = tileSize;
      this.changed();
    });
    image.src = testTileUrl;
  }