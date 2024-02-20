function loadSourceFiles(locationKeyToHookSourceAndMetadata, fetchFileWithCaching) {
  // Deduplicate fetches, since there can be multiple location keys per file.
  const dedupedFetchPromises = new Map();
  const setterPromises = [];
  locationKeyToHookSourceAndMetadata.forEach(hookSourceAndMetadata => {
    const {
      runtimeSourceURL
    } = hookSourceAndMetadata;
    let fetchFileFunction = fetchFile;

    if (fetchFileWithCaching != null) {
      // If a helper function has been injected to fetch with caching,
      // use it to fetch the (already loaded) source file.
      fetchFileFunction = url => {
        return Object(react_devtools_shared_src_PerformanceLoggingUtils__WEBPACK_IMPORTED_MODULE_3__[/* withAsyncPerfMeasurements */ "a"])(`fetchFileWithCaching("${url}")`, () => {
          return fetchFileWithCaching(url);
        });
      };
    }

    const fetchPromise = dedupedFetchPromises.get(runtimeSourceURL) || fetchFileFunction(runtimeSourceURL).then(runtimeSourceCode => {
      // TODO (named hooks) Re-think this; the main case where it matters is when there's no source-maps,
      // because then we need to parse the full source file as an AST.
      if (runtimeSourceCode.length > MAX_SOURCE_LENGTH) {
        throw Error('Source code too large to parse');
      }

      if (react_devtools_shared_src_constants__WEBPACK_IMPORTED_MODULE_0__[/* __DEBUG__ */ "F"]) {
        console.groupCollapsed(`loadSourceFiles() runtimeSourceURL "${runtimeSourceURL}"`);
        console.log(runtimeSourceCode);
        console.groupEnd();
      }

      return runtimeSourceCode;
    });
    dedupedFetchPromises.set(runtimeSourceURL, fetchPromise);
    setterPromises.push(fetchPromise.then(runtimeSourceCode => {
      hookSourceAndMetadata.runtimeSourceCode = runtimeSourceCode;
    }));
  });
  return Promise.all(setterPromises);
}