function parseSourceMaps(locationKeyToHookSourceAndMetadata, locationKeyToHookParsedMetadata) {
  locationKeyToHookSourceAndMetadata.forEach((hookSourceAndMetadata, locationKey) => {
    const hookParsedMetadata = locationKeyToHookParsedMetadata.get(locationKey);

    if (hookParsedMetadata == null) {
      throw Error(`Expected to find HookParsedMetadata for "${locationKey}"`);
    }

    const {
      runtimeSourceURL,
      sourceMapJSON
    } = hookSourceAndMetadata; // If we've already loaded the source map info for this file,
    // we can skip reloading it (and more importantly, re-parsing it).

    const runtimeMetadata = runtimeURLToMetadataCache.get(runtimeSourceURL);

    if (runtimeMetadata != null) {
      if (__DEBUG__) {
        console.groupCollapsed(`parseHookNames() Found cached runtime metadata for file "${runtimeSourceURL}"`);
        console.log(runtimeMetadata);
        console.groupEnd();
      }

      hookParsedMetadata.metadataConsumer = runtimeMetadata.metadataConsumer;
      hookParsedMetadata.sourceMapConsumer = runtimeMetadata.sourceMapConsumer;
    } else {
      if (sourceMapJSON != null) {
        const sourceMapConsumer = withSyncPerfMeasurements('new SourceMapConsumer(sourceMapJSON)', () => SourceMapConsumer(sourceMapJSON));
        const metadataConsumer = withSyncPerfMeasurements('new SourceMapMetadataConsumer(sourceMapJSON)', () => new SourceMapMetadataConsumer_SourceMapMetadataConsumer(sourceMapJSON));
        hookParsedMetadata.metadataConsumer = metadataConsumer;
        hookParsedMetadata.sourceMapConsumer = sourceMapConsumer; // Only set once to avoid triggering eviction/cleanup code.

        runtimeURLToMetadataCache.set(runtimeSourceURL, {
          metadataConsumer: metadataConsumer,
          sourceMapConsumer: sourceMapConsumer
        });
      }
    }
  });
}