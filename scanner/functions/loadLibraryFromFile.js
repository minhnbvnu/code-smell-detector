async function loadLibraryFromFile(libraryUrl) {
    if (libraryUrl.endsWith("wasm")) {
      const response2 = await fetch(libraryUrl);
      return await response2.arrayBuffer();
    }
    if (!isBrowser2) {
      try {
        return node && node.requireFromFile && await node.requireFromFile(libraryUrl);
      } catch {
        return null;
      }
    }
    if (isWorker) {
      return importScripts(libraryUrl);
    }
    const response = await fetch(libraryUrl);
    const scriptSource = await response.text();
    return loadLibraryFromString(scriptSource, libraryUrl);
  }