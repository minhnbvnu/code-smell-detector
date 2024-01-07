function labelStyleParser(node, objectStack) {
  // FIXME colorMode
  const object = pushParseAndPop({}, LABEL_STYLE_PARSERS, node, objectStack);
  if (!object) {
    return;
  }
  const styleObject = objectStack[objectStack.length - 1];
  const textStyle = new Text({
    fill: new Fill({
      color:
        /** @type {import("../color.js").Color} */
        ('color' in object ? object['color'] : DEFAULT_COLOR),
    }),
    scale: /** @type {number|undefined} */ (object['scale']),
  });
  styleObject['textStyle'] = textStyle;
}