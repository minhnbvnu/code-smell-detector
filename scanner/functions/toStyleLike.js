function toStyleLike(style) {
  if (style === undefined) {
    return createDefaultStyle;
  }
  if (!style) {
    return null;
  }
  if (typeof style === 'function') {
    return style;
  }
  if (style instanceof Style) {
    return style;
  }
  if (!Array.isArray(style)) {
    return flatStylesToStyleFunction([style]);
  }
  if (style.length === 0) {
    return [];
  }

  const length = style.length;
  const first = style[0];

  if (first instanceof Style) {
    /**
     * @type {Array<Style>}
     */
    const styles = new Array(length);
    for (let i = 0; i < length; ++i) {
      const candidate = style[i];
      if (!(candidate instanceof Style)) {
        throw new Error('Expected a list of style instances');
      }
      styles[i] = candidate;
    }
    return styles;
  }

  if ('style' in first) {
    /**
     * @type Array<import("../style/flat.js").Rule>
     */
    const rules = new Array(length);
    for (let i = 0; i < length; ++i) {
      const candidate = style[i];
      if (!('style' in candidate)) {
        throw new Error('Expected a list of rules with a style property');
      }
      rules[i] = candidate;
    }
    return rulesToStyleFunction(rules);
  }

  const flatStyles =
    /** @type {Array<import("../style/flat.js").FlatStyle>} */ (style);
  return flatStylesToStyleFunction(flatStyles);
}