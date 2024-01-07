function generateVersion3Options(iiifInfo) {
  const levelProfile = iiifInfo.getComplianceLevelSupportedFeatures(),
    formats =
      iiifInfo.imageInfo.extraFormats === undefined
        ? levelProfile.formats
        : [...levelProfile.formats, ...iiifInfo.imageInfo.extraFormats],
    preferredFormat =
      iiifInfo.imageInfo.preferredFormats !== undefined &&
      Array.isArray(iiifInfo.imageInfo.preferredFormats) &&
      iiifInfo.imageInfo.preferredFormats.length > 0
        ? iiifInfo.imageInfo.preferredFormats
            .filter(function (format) {
              return ['jpg', 'png', 'gif'].includes(format);
            })
            .reduce(function (acc, format) {
              return acc === undefined && formats.includes(format)
                ? format
                : acc;
            }, undefined)
        : undefined;
  return {
    url: iiifInfo.imageInfo['id'],
    sizes:
      iiifInfo.imageInfo.sizes === undefined
        ? undefined
        : iiifInfo.imageInfo.sizes.map(function (size) {
            return [size.width, size.height];
          }),
    tileSize:
      iiifInfo.imageInfo.tiles === undefined
        ? undefined
        : [
            iiifInfo.imageInfo.tiles.map(function (tile) {
              return tile.width;
            })[0],
            iiifInfo.imageInfo.tiles.map(function (tile) {
              return tile.height;
            })[0],
          ],
    resolutions:
      iiifInfo.imageInfo.tiles === undefined
        ? undefined
        : iiifInfo.imageInfo.tiles.map(function (tile) {
            return tile.scaleFactors;
          })[0],
    supports:
      iiifInfo.imageInfo.extraFeatures === undefined
        ? levelProfile.supports
        : [...levelProfile.supports, ...iiifInfo.imageInfo.extraFeatures],
    formats: formats,
    qualities:
      iiifInfo.imageInfo.extraQualities === undefined
        ? levelProfile.qualities
        : [...levelProfile.qualities, ...iiifInfo.imageInfo.extraQualities],
    preferredFormat: preferredFormat,
  };
}