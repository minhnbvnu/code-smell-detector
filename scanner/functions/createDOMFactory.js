function createDOMFactory(tag) {
  if ("production" !== "development") {
    return ReactElementValidator.createFactory(tag);
  }
  return ReactElement.createFactory(tag);
}