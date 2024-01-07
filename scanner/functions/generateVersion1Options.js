function generateVersion1Options(iiifInfo) {
  let levelProfile = iiifInfo.getComplianceLevelSupportedFeatures();
  // Version 1.0 and 1.1 do not require a profile.
  if (levelProfile === undefined) {
    levelProfile = IIIF_PROFILE_VALUES[Versions.VERSION1]['level0'];
  }
  return {
    url:
      iiifInfo.imageInfo['@id'] === undefined
        ? undefined
        : iiifInfo.imageInfo['@id'].replace(/\/?(?:info\.json)?$/g, ''),
    supports: levelProfile.supports,
    formats: [
      ...levelProfile.formats,
      iiifInfo.imageInfo.formats === undefined
        ? []
        : iiifInfo.imageInfo.formats,
    ],
    qualities: [
      ...levelProfile.qualities,
      iiifInfo.imageInfo.qualities === undefined
        ? []
        : iiifInfo.imageInfo.qualities,
    ],
    resolutions: iiifInfo.imageInfo.scale_factors,
    tileSize:
      iiifInfo.imageInfo.tile_width !== undefined
        ? iiifInfo.imageInfo.tile_height !== undefined
          ? [iiifInfo.imageInfo.tile_width, iiifInfo.imageInfo.tile_height]
          : [iiifInfo.imageInfo.tile_width, iiifInfo.imageInfo.tile_width]
        : iiifInfo.imageInfo.tile_height != undefined
          ? [iiifInfo.imageInfo.tile_height, iiifInfo.imageInfo.tile_height]
          : undefined,
  };
}