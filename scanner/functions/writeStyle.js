function writeStyle(node, styles, objectStack) {
  const /** @type {import("../xml.js").NodeStackItem} */ context = {node: node};
  const properties = {};
  if (styles.pointStyles.length) {
    const textStyle = styles.pointStyles[0].getText();
    if (textStyle) {
      properties['LabelStyle'] = textStyle;
    }
    const imageStyle = styles.pointStyles[0].getImage();
    if (
      imageStyle &&
      typeof (/** @type {?} */ (imageStyle).getSrc) === 'function'
    ) {
      properties['IconStyle'] = imageStyle;
    }
  }
  if (styles.lineStyles.length) {
    const strokeStyle = styles.lineStyles[0].getStroke();
    if (strokeStyle) {
      properties['LineStyle'] = strokeStyle;
    }
  }
  if (styles.polyStyles.length) {
    const strokeStyle = styles.polyStyles[0].getStroke();
    if (strokeStyle && !properties['LineStyle']) {
      properties['LineStyle'] = strokeStyle;
    }
    properties['PolyStyle'] = styles.polyStyles[0];
  }
  const parentNode = objectStack[objectStack.length - 1].node;
  const orderedKeys = STYLE_SEQUENCE[parentNode.namespaceURI];
  const values = makeSequence(properties, orderedKeys);
  pushSerializeAndPop(
    context,
    STYLE_SERIALIZERS,
    OBJECT_PROPERTY_NODE_FACTORY,
    values,
    objectStack,
    orderedKeys,
  );
}