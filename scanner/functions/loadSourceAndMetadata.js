async function loadSourceAndMetadata(hooksList, fetchFileWithCaching) {
  return Object(react_devtools_shared_src_PerformanceLoggingUtils__WEBPACK_IMPORTED_MODULE_3__[/* withAsyncPerfMeasurements */ "a"])('loadSourceAndMetadata()', async () => {
    const locationKeyToHookSourceAndMetadata = Object(react_devtools_shared_src_PerformanceLoggingUtils__WEBPACK_IMPORTED_MODULE_3__[/* withSyncPerfMeasurements */ "c"])('initializeHookSourceAndMetadata', () => initializeHookSourceAndMetadata(hooksList));
    await Object(react_devtools_shared_src_PerformanceLoggingUtils__WEBPACK_IMPORTED_MODULE_3__[/* withAsyncPerfMeasurements */ "a"])('loadSourceFiles()', () => loadSourceFiles(locationKeyToHookSourceAndMetadata, fetchFileWithCaching));
    await Object(react_devtools_shared_src_PerformanceLoggingUtils__WEBPACK_IMPORTED_MODULE_3__[/* withAsyncPerfMeasurements */ "a"])('extractAndLoadSourceMapJSON()', () => extractAndLoadSourceMapJSON(locationKeyToHookSourceAndMetadata)); // At this point, we've loaded JS source (text) and source map (JSON).
    // The remaining works (parsing these) is CPU intensive and should be done in a worker.

    return locationKeyToHookSourceAndMetadata;
  });
}