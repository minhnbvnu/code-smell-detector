function renderIntoDom(
    reactElement,
    domElement,
    forceHydrate,
    errorCount = 0,
  ) {
    return expectErrors(async () => {
      await asyncReactDOMRender(reactElement, domElement, forceHydrate);
      return domElement.firstChild;
    }, errorCount);
  }