function createStyleFunction(obj) {
  if (typeof obj === 'function') {
    return obj;
  }
  /**
   * @type {Array<import("./style/Style.js").default>}
   */
  let styles;
  if (Array.isArray(obj)) {
    styles = obj;
  } else {
    assert(
      typeof (/** @type {?} */ (obj).getZIndex) === 'function',
      'Expected an `ol/style/Style` or an array of `ol/style/Style.js`',
    );
    const style = /** @type {import("./style/Style.js").default} */ (obj);
    styles = [style];
  }
  return function () {
    return styles;
  };
}