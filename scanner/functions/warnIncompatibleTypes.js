function warnIncompatibleTypes(incompatibleTypes, asset, emittedWarnings) {
  const errorString = `Asset is used as both ${[...incompatibleTypes]
    .sort()
    .join(' and ')}`;
  if (!emittedWarnings.has(errorString)) {
    emittedWarnings.add(errorString);
    const err = new Error(errorString);
    err.asset = asset;
    asset.assetGraph.warn(err);
  }
}