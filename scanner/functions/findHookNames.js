function findHookNames(hooksList, locationKeyToHookParsedMetadata) {
  const map = new Map();
  hooksList.map(hook => {
    // We already guard against a null HookSource in parseHookNames()
    const hookSource = hook.hookSource;
    const fileName = hookSource.fileName;

    if (!fileName) {
      return null; // Should not be reachable.
    }

    const locationKey = getHookSourceLocationKey(hookSource);
    const hookParsedMetadata = locationKeyToHookParsedMetadata.get(locationKey);

    if (!hookParsedMetadata) {
      return null; // Should not be reachable.
    }

    const {
      lineNumber,
      columnNumber
    } = hookSource;

    if (!lineNumber || !columnNumber) {
      return null; // Should not be reachable.
    }

    const {
      originalSourceURL,
      originalSourceColumnNumber,
      originalSourceLineNumber
    } = hookParsedMetadata;

    if (originalSourceLineNumber == null || originalSourceColumnNumber == null || originalSourceURL == null) {
      return null; // Should not be reachable.
    }

    let name;
    const {
      metadataConsumer
    } = hookParsedMetadata;

    if (metadataConsumer != null) {
      name = withSyncPerfMeasurements('metadataConsumer.hookNameFor()', () => metadataConsumer.hookNameFor({
        line: originalSourceLineNumber,
        column: originalSourceColumnNumber,
        source: originalSourceURL
      }));
    }

    if (name == null) {
      name = withSyncPerfMeasurements('getHookName()', () => getHookName(hook, hookParsedMetadata.originalSourceAST, hookParsedMetadata.originalSourceCode, originalSourceLineNumber, originalSourceColumnNumber));
    }

    if (__DEBUG__) {
      console.log(`findHookNames() Found name "${name || '-'}"`);
    }

    const key = getHookSourceLocationKey(hookSource);
    map.set(key, name);
  });
  return map;
}