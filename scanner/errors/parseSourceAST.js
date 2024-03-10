  locationKeyToHookSourceAndMetadata.forEach((hookSourceAndMetadata, locationKey) => {
    const hookParsedMetadata = locationKeyToHookParsedMetadata.get(locationKey);

    if (hookParsedMetadata == null) {
      throw Error(`Expected to find HookParsedMetadata for "${locationKey}"`);
    }

    if (hookParsedMetadata.originalSourceAST !== null) {
      // Use cached metadata.
      return;
    }

    if (hookParsedMetadata.originalSourceURL != null && hookParsedMetadata.originalSourceCode != null && hookParsedMetadata.originalSourceColumnNumber != null && hookParsedMetadata.originalSourceLineNumber != null) {
      // Use cached metadata.
      return;
    }

    const {
      lineNumber,
      columnNumber
    } = hookSourceAndMetadata.hookSource;

    if (lineNumber == null || columnNumber == null) {
      throw Error('Hook source code location not found.');
    }

    const {
      metadataConsumer,
      sourceMapConsumer
    } = hookParsedMetadata;
    const runtimeSourceCode = hookSourceAndMetadata.runtimeSourceCode;
    let hasHookMap = false;
    let originalSourceURL;
    let originalSourceCode;
    let originalSourceColumnNumber;
    let originalSourceLineNumber;

    if (areSourceMapsAppliedToErrors() || sourceMapConsumer === null) {
      // Either the current environment automatically applies source maps to errors,
      // or the current code had no source map to begin with.
      // Either way, we don't need to convert the Error stack frame locations.
      originalSourceColumnNumber = columnNumber;
      originalSourceLineNumber = lineNumber; // There's no source map to parse here so we can just parse the original source itself.

      originalSourceCode = runtimeSourceCode; // TODO (named hooks) This mixes runtimeSourceURLs with source mapped URLs in the same cache key space.
      // Namespace them?

      originalSourceURL = hookSourceAndMetadata.runtimeSourceURL;
    } else {
      const {
        column,
        line,
        sourceContent,
        sourceURL
      } = sourceMapConsumer.originalPositionFor({
        columnNumber,
        lineNumber
      });
      originalSourceColumnNumber = column;
      originalSourceLineNumber = line;
      originalSourceCode = sourceContent;
      originalSourceURL = sourceURL;
    }

    hookParsedMetadata.originalSourceCode = originalSourceCode;
    hookParsedMetadata.originalSourceURL = originalSourceURL;
    hookParsedMetadata.originalSourceLineNumber = originalSourceLineNumber;
    hookParsedMetadata.originalSourceColumnNumber = originalSourceColumnNumber;

    if (metadataConsumer != null && metadataConsumer.hasHookMap(originalSourceURL)) {
      hasHookMap = true;
    }

    if (__DEBUG__) {
      console.log(`parseSourceAST() mapped line ${lineNumber}->${originalSourceLineNumber} and column ${columnNumber}->${originalSourceColumnNumber}`);
    }

    if (hasHookMap) {
      if (__DEBUG__) {
        console.log(`parseSourceAST() Found hookMap and skipping parsing for "${originalSourceURL}"`);
      } // If there's a hook map present from an extended sourcemap then
      // we don't need to parse the source files and instead can use the
      // hook map to extract hook names.


      return;
    }

    if (__DEBUG__) {
      console.log(`parseSourceAST() Did not find hook map for "${originalSourceURL}"`);
    } // The cache also serves to deduplicate parsing by URL in our loop over location keys.
    // This may need to change if we switch to async parsing.


    const sourceMetadata = originalURLToMetadataCache.get(originalSourceURL);

    if (sourceMetadata != null) {
      if (__DEBUG__) {
        console.groupCollapsed(`parseSourceAST() Found cached source metadata for "${originalSourceURL}"`);
        console.log(sourceMetadata);
        console.groupEnd();
      }

      hookParsedMetadata.originalSourceAST = sourceMetadata.originalSourceAST;
      hookParsedMetadata.originalSourceCode = sourceMetadata.originalSourceCode;
    } else {
      try {
        // TypeScript is the most commonly used typed JS variant so let's default to it
        // unless we detect explicit Flow usage via the "" pragma.
        const plugin = originalSourceCode.indexOf('@flow') > 0 ? 'flow' : 'typescript'; // TODO (named hooks) This is probably where we should check max source length,
        // rather than in loadSourceAndMetatada -> loadSourceFiles().
        // TODO(#22319): Support source files that are html files with inline script tags.

        const originalSourceAST = withSyncPerfMeasurements('[@babel/parser] parse(originalSourceCode)', () => Object(lib["parse"])(originalSourceCode, {
          sourceType: 'unambiguous',
          plugins: ['jsx', plugin]
        }));
        hookParsedMetadata.originalSourceAST = originalSourceAST;

        if (__DEBUG__) {
          console.log(`parseSourceAST() Caching source metadata for "${originalSourceURL}"`);
        }

        originalURLToMetadataCache.set(originalSourceURL, {
          originalSourceAST,
          originalSourceCode
        });
      } catch (error) {
        throw new Error(`Failed to parse source file: ${originalSourceURL}\n\n` + `Original error: ${error}`);
      }
    }
  });