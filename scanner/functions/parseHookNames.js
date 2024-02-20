async function parseHookNames(hooksTree, fetchFileWithCaching) {
  return Object(react_devtools_shared_src_PerformanceLoggingUtils__WEBPACK_IMPORTED_MODULE_0__[/* withAsyncPerfMeasurements */ "a"])('parseHookNames', async () => {
    const hooksList = Object(_loadSourceAndMetadata__WEBPACK_IMPORTED_MODULE_2__[/* flattenHooksList */ "a"])(hooksTree);

    if (hooksList.length === 0) {
      // This component tree contains no named hooks.
      return EMPTY_MAP;
    } // Runs on the main/UI thread so it can reuse Network cache:


    const locationKeyToHookSourceAndMetadata = await Object(_loadSourceAndMetadata__WEBPACK_IMPORTED_MODULE_2__[/* loadSourceAndMetadata */ "b"])(hooksList, fetchFileWithCaching); // Runs in a Worker because it's CPU intensive:

    return parseSourceAndMetadata(hooksList, locationKeyToHookSourceAndMetadata);
  });
}