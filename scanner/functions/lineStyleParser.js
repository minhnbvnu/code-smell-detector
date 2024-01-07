function lineStyleParser(node, objectStack) {
  // FIXME colorMode
  // FIXME gx:outerColor
  // FIXME gx:outerWidth
  // FIXME gx:physicalWidth
  // FIXME gx:labelVisibility
  const object = pushParseAndPop({}, LINE_STYLE_PARSERS, node, objectStack);
  if (!object) {
    return;
  }
  const styleObject = objectStack[objectStack.length - 1];
  const strokeStyle = new Stroke({
    color:
      /** @type {import("../color.js").Color} */
      ('color' in object ? object['color'] : DEFAULT_COLOR),
    width: /** @type {number} */ ('width' in object ? object['width'] : 1),
  });
  styleObject['strokeStyle'] = strokeStyle;
}