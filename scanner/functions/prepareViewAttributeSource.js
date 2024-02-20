function prepareViewAttributeSource(id, path) {
    if (isMostRecentlyInspectedElement(id)) {
      window.$attribute = Object(utils["n" /* getInObject */])(mostRecentlyInspectedElement, path);
    }
  }