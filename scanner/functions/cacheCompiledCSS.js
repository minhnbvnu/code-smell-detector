function cacheCompiledCSS(lessCache, lessFilePath, importFallbackVariables) {
    let lessSource = fs.readFileSync(lessFilePath, 'utf8');
    if (importFallbackVariables) {
      lessSource = FALLBACK_VARIABLE_IMPORTS + lessSource;
    }
    lessCache.cssForFile(lessFilePath, lessSource);
    saveIntoSnapshotAuxiliaryData(lessFilePath, lessSource);
  }