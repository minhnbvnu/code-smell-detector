function initializeHookSourceAndMetadata(hooksList) {
  // Create map of unique source locations (file names plus line and column numbers) to metadata about hooks.
  const locationKeyToHookSourceAndMetadata = new Map();

  for (let i = 0; i < hooksList.length; i++) {
    const hook = hooksList[i];
    const hookSource = hook.hookSource;

    if (hookSource == null) {
      // Older versions of react-debug-tools don't include this information.
      // In this case, we can't continue.
      throw Error('Hook source code location not found.');
    }

    const locationKey = Object(react_devtools_shared_src_hookNamesCache__WEBPACK_IMPORTED_MODULE_1__[/* getHookSourceLocationKey */ "b"])(hookSource);

    if (!locationKeyToHookSourceAndMetadata.has(locationKey)) {
      // Can't be null because getHookSourceLocationKey() would have thrown
      const runtimeSourceURL = hookSource.fileName;
      const hookSourceAndMetadata = {
        hookSource,
        runtimeSourceCode: null,
        runtimeSourceURL,
        sourceMapJSON: null,
        sourceMapURL: null
      };
      locationKeyToHookSourceAndMetadata.set(locationKey, hookSourceAndMetadata);
    }
  }

  return locationKeyToHookSourceAndMetadata;
}