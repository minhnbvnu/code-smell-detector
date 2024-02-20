async function parseSourceAndMetadata(hooksList, locationKeyToHookSourceAndMetadata) {
  return withAsyncPerfMeasurements('parseSourceAndMetadata()', async () => {
    const locationKeyToHookParsedMetadata = withSyncPerfMeasurements('initializeHookParsedMetadata', () => initializeHookParsedMetadata(locationKeyToHookSourceAndMetadata));
    withSyncPerfMeasurements('parseSourceMaps', () => parseSourceMaps(locationKeyToHookSourceAndMetadata, locationKeyToHookParsedMetadata));
    withSyncPerfMeasurements('parseSourceAST()', () => parseSourceAST(locationKeyToHookSourceAndMetadata, locationKeyToHookParsedMetadata));
    return withSyncPerfMeasurements('findHookNames()', () => findHookNames(hooksList, locationKeyToHookParsedMetadata));
  });
}