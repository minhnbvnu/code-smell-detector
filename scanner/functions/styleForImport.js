function styleForImport(importDoc) {
    // NOTE: polyfill affordance.
    // under the HTMLImports polyfill, there will be no 'body',
    // but the import pseudo-doc can be used directly.
    let container = importDoc.body ? importDoc.body : importDoc;
    const importCss = Polymer.ResolveUrl.resolveCss(container.textContent,
      importDoc.baseURI);
    const style = document.createElement('style');
    style.textContent = importCss;
    return style;
  }