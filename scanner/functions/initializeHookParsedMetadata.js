function initializeHookParsedMetadata(locationKeyToHookSourceAndMetadata) {
  // Create map of unique source locations (file names plus line and column numbers) to metadata about hooks.
  const locationKeyToHookParsedMetadata = new Map();
  locationKeyToHookSourceAndMetadata.forEach((hookSourceAndMetadata, locationKey) => {
    const hookParsedMetadata = {
      metadataConsumer: null,
      originalSourceAST: null,
      originalSourceCode: null,
      originalSourceURL: null,
      originalSourceLineNumber: null,
      originalSourceColumnNumber: null,
      sourceMapConsumer: null
    };
    locationKeyToHookParsedMetadata.set(locationKey, hookParsedMetadata);
  });
  return locationKeyToHookParsedMetadata;
}