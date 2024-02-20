async function loadLibrary(libraryUrl, moduleName = null, options = {}) {
    if (moduleName) {
      libraryUrl = getLibraryUrl(libraryUrl, moduleName, options);
    }
    loadLibraryPromises[libraryUrl] = loadLibraryPromises[libraryUrl] || loadLibraryFromFile(libraryUrl);
    return await loadLibraryPromises[libraryUrl];
  }