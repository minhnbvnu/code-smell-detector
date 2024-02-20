function copyElementPath(id, path) {
    if (isMostRecentlyInspectedElement(id)) {
      Object(backend_utils["b" /* copyToClipboard */])(Object(utils["n" /* getInObject */])(mostRecentlyInspectedElement, path));
    }
  }