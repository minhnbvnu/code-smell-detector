function toFunction(obj) {
  let styleFunction;

  if (typeof obj === 'function') {
    styleFunction = obj;
  } else {
    /**
     * @type {Array<Style>}
     */
    let styles;
    if (Array.isArray(obj)) {
      styles = obj;
    } else {
      assert(
        typeof (/** @type {?} */ (obj).getZIndex) === 'function',
        'Expected an `Style` or an array of `Style`',
      );
      const style = /** @type {Style} */ (obj);
      styles = [style];
    }
    styleFunction = function () {
      return styles;
    };
  }
  return styleFunction;
}