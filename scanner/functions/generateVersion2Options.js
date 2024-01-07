function generateVersion2Options(iiifInfo) {
  const levelProfile = iiifInfo.getComplianceLevelSupportedFeatures(),
    additionalProfile =
      Array.isArray(iiifInfo.imageInfo.profile) &&
      iiifInfo.imageInfo.profile.length > 1,
    profileSupports =
      additionalProfile && iiifInfo.imageInfo.profile[1].supports
        ? iiifInfo.imageInfo.profile[1].supports
        : [],
    profileFormats =
      additionalProfile && iiifInfo.imageInfo.profile[1].formats
        ? iiifInfo.imageInfo.profile[1].formats
        : [],
    profileQualities =
      additionalProfile && iiifInfo.imageInfo.profile[1].qualities
        ? iiifInfo.imageInfo.profile[1].qualities
        : [];
  return {
    url: iiifInfo.imageInfo['@id'].replace(/\/?(?:info\.json)?$/g, ''),
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
              return tile.height === undefined ? tile.width : tile.height;
            })[0],
          ],
    resolutions:
      iiifInfo.imageInfo.tiles === undefined
        ? undefined
        : iiifInfo.imageInfo.tiles.map(function (tile) {
            return tile.scaleFactors;
          })[0],
    supports: [...levelProfile.supports, ...profileSupports],
    formats: [...levelProfile.formats, ...profileFormats],
    qualities: [...levelProfile.qualities, ...profileQualities],
  };
}