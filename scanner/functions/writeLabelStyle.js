function writeLabelStyle(node, style, objectStack) {
  const /** @type {import("../xml.js").NodeStackItem} */ context = {node: node};
  const properties = {};
  const fill = style.getFill();
  if (fill) {
    properties['color'] = fill.getColor();
  }
  const scale = style.getScale();
  if (scale && scale !== 1) {
    properties['scale'] = scale;
  }
  const parentNode = objectStack[objectStack.length - 1].node;
  const orderedKeys = LABEL_STYLE_SEQUENCE[parentNode.namespaceURI];
  const values = makeSequence(properties, orderedKeys);
  pushSerializeAndPop(
    context,
    LABEL_STYLE_SERIALIZERS,
    OBJECT_PROPERTY_NODE_FACTORY,
    values,
    objectStack,
    orderedKeys,
  );
}