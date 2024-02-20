function extractAndLoadSourceMapJSON(locationKeyToHookSourceAndMetadata) {
  // Deduplicate fetches, since there can be multiple location keys per source map.
  const dedupedFetchPromises = new Map();

  if (react_devtools_shared_src_constants__WEBPACK_IMPORTED_MODULE_0__[/* __DEBUG__ */ "F"]) {
    console.log('extractAndLoadSourceMapJSON() load', locationKeyToHookSourceAndMetadata.size, 'source maps');
  }

  const setterPromises = [];
  locationKeyToHookSourceAndMetadata.forEach(hookSourceAndMetadata => {
    const sourceMapRegex = / ?sourceMappingURL=([^\s'"]+)/gm;
    const runtimeSourceCode = hookSourceAndMetadata.runtimeSourceCode; // TODO (named hooks) Search for our custom metadata first.
    // If it's found, we should use it rather than source maps.
    // TODO (named hooks) If this RegExp search is slow, we could try breaking it up
    // first using an indexOf(' sourceMappingURL=') to find the start of the comment
    // (probably at the end of the file) and then running the RegExp on the remaining substring.

    let sourceMappingURLMatch = Object(react_devtools_shared_src_PerformanceLoggingUtils__WEBPACK_IMPORTED_MODULE_3__[/* withSyncPerfMeasurements */ "c"])('sourceMapRegex.exec(runtimeSourceCode)', () => sourceMapRegex.exec(runtimeSourceCode));

    if (sourceMappingURLMatch == null) {
      if (react_devtools_shared_src_constants__WEBPACK_IMPORTED_MODULE_0__[/* __DEBUG__ */ "F"]) {
        console.log('extractAndLoadSourceMapJSON() No source map found');
      } // Maybe file has not been transformed; we'll try to parse it as-is in parseSourceAST().

    } else {
      const externalSourceMapURLs = [];

      while (sourceMappingURLMatch != null) {
        const {
          runtimeSourceURL
        } = hookSourceAndMetadata;
        const sourceMappingURL = sourceMappingURLMatch[1];
        const hasInlineSourceMap = sourceMappingURL.indexOf('base64,') >= 0;

        if (hasInlineSourceMap) {
          try {
            // TODO (named hooks) deduplicate parsing in this branch (similar to fetching in the other branch)
            // since there can be multiple location keys per source map.
            // Web apps like Code Sandbox embed multiple inline source maps.
            // In this case, we need to loop through and find the right one.
            // We may also need to trim any part of this string that isn't based64 encoded data.
            const trimmed = sourceMappingURL.match(/base64,([a-zA-Z0-9+\/=]+)/)[1];
            const decoded = Object(react_devtools_shared_src_PerformanceLoggingUtils__WEBPACK_IMPORTED_MODULE_3__[/* withSyncPerfMeasurements */ "c"])('decodeBase64String()', () => decodeBase64String(trimmed));
            const sourceMapJSON = Object(react_devtools_shared_src_PerformanceLoggingUtils__WEBPACK_IMPORTED_MODULE_3__[/* withSyncPerfMeasurements */ "c"])('JSON.parse(decoded)', () => JSON.parse(decoded));

            if (react_devtools_shared_src_constants__WEBPACK_IMPORTED_MODULE_0__[/* __DEBUG__ */ "F"]) {
              console.groupCollapsed('extractAndLoadSourceMapJSON() Inline source map');
              console.log(sourceMapJSON);
              console.groupEnd();
            } // Hook source might be a URL like "https://4syus.csb.app/src/App.js"
            // Parsed source map might be a partial path like "src/App.js"


            if (Object(_SourceMapUtils__WEBPACK_IMPORTED_MODULE_2__[/* sourceMapIncludesSource */ "a"])(sourceMapJSON, runtimeSourceURL)) {
              hookSourceAndMetadata.sourceMapJSON = sourceMapJSON; // OPTIMIZATION If we've located a source map for this source,
              // we'll use it to retrieve the original source (to extract hook names).
              // We only fall back to parsing the full source code is when there's no source map.
              // The source is (potentially) very large,
              // So we can avoid the overhead of serializing it unnecessarily.

              hookSourceAndMetadata.runtimeSourceCode = null;
              break;
            }
          } catch (error) {// We've likely encountered a string in the source code that looks like a source map but isn't.
            // Maybe the source code contains a "sourceMappingURL" comment or soething similar.
            // In either case, let's skip this and keep looking.
          }
        } else {
          externalSourceMapURLs.push(sourceMappingURL);
        } // If the first source map we found wasn't a match, check for more.


        sourceMappingURLMatch = Object(react_devtools_shared_src_PerformanceLoggingUtils__WEBPACK_IMPORTED_MODULE_3__[/* withSyncPerfMeasurements */ "c"])('sourceMapRegex.exec(runtimeSourceCode)', () => sourceMapRegex.exec(runtimeSourceCode));
      }

      if (hookSourceAndMetadata.sourceMapJSON === null) {
        externalSourceMapURLs.forEach((sourceMappingURL, index) => {
          if (index !== externalSourceMapURLs.length - 1) {
            // Files with external source maps should only have a single source map.
            // More than one result might indicate an edge case,
            // like a string in the source code that matched our "sourceMappingURL" regex.
            // We should just skip over cases like this.
            console.warn(`More than one external source map detected in the source file; skipping "${sourceMappingURL}"`);
            return;
          }

          const {
            runtimeSourceURL
          } = hookSourceAndMetadata;
          let url = sourceMappingURL;

          if (!url.startsWith('http') && !url.startsWith('/')) {
            // Resolve paths relative to the location of the file name
            const lastSlashIdx = runtimeSourceURL.lastIndexOf('/');

            if (lastSlashIdx !== -1) {
              const baseURL = runtimeSourceURL.slice(0, runtimeSourceURL.lastIndexOf('/'));
              url = `${baseURL}/${url}`;
            }
          }

          hookSourceAndMetadata.sourceMapURL = url;
          const fetchPromise = dedupedFetchPromises.get(url) || fetchFile(url).then(sourceMapContents => {
            const sourceMapJSON = Object(react_devtools_shared_src_PerformanceLoggingUtils__WEBPACK_IMPORTED_MODULE_3__[/* withSyncPerfMeasurements */ "c"])('JSON.parse(sourceMapContents)', () => JSON.parse(sourceMapContents));
            return sourceMapJSON;
          }, // In this case, we fall back to the assumption that the source has no source map.
          // This might indicate an (unlikely) edge case that had no source map,
          // but contained the string "sourceMappingURL".
          error => null);

          if (react_devtools_shared_src_constants__WEBPACK_IMPORTED_MODULE_0__[/* __DEBUG__ */ "F"]) {
            if (!dedupedFetchPromises.has(url)) {
              console.log(`extractAndLoadSourceMapJSON() External source map "${url}"`);
            }
          }

          dedupedFetchPromises.set(url, fetchPromise);
          setterPromises.push(fetchPromise.then(sourceMapJSON => {
            if (sourceMapJSON !== null) {
              hookSourceAndMetadata.sourceMapJSON = sourceMapJSON; // OPTIMIZATION If we've located a source map for this source,
              // we'll use it to retrieve the original source (to extract hook names).
              // We only fall back to parsing the full source code is when there's no source map.
              // The source is (potentially) very large,
              // So we can avoid the overhead of serializing it unnecessarily.

              hookSourceAndMetadata.runtimeSourceCode = null;
            }
          }));
        });
      }
    }
  });
  return Promise.all(setterPromises);
}