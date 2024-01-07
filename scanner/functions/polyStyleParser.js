function polyStyleParser(node, objectStack) {
  // FIXME colorMode
  const object = pushParseAndPop({}, POLY_STYLE_PARSERS, node, objectStack);
  if (!object) {
    return;
  }
  const styleObject = objectStack[objectStack.length - 1];
  const fillStyle = new Fill({
    color:
      /** @type {import("../color.js").Color} */
      ('color' in object ? object['color'] : DEFAULT_COLOR),
  });
  styleObject['fillStyle'] = fillStyle;
  const fill = /** @type {boolean|undefined} */ (object['fill']);
  if (fill !== undefined) {
    styleObject['fill'] = fill;
  }
  const outline = /** @type {boolean|undefined} */ (object['outline']);
  if (outline !== undefined) {
    styleObject['outline'] = outline;
  }
}