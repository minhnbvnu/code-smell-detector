function getNodes(object, selector) {
  if (
    typeof selector === 'string'
        && !htmlReg.test(selector)
        && customSelectorReg.test(selector)
  ) {
    return selectNodes(object, selector);
  }

  return dom.$(selector);
}