function writePolyStyle(node, style, objectStack) {
  const /** @type {import("../xml.js").NodeStackItem} */ context = {node: node};
  const fill = style.getFill();
  const stroke = style.getStroke();
  const properties = {
    'color': fill ? fill.getColor() : undefined,
    'fill': fill ? undefined : false,
    'outline': stroke ? undefined : false,
  };
  const parentNode = objectStack[objectStack.length - 1].node;
  const orderedKeys = POLY_STYLE_SEQUENCE[parentNode.namespaceURI];
  const values = makeSequence(properties, orderedKeys);
  pushSerializeAndPop(
    context,
    POLY_STYLE_SERIALIZERS,
    OBJECT_PROPERTY_NODE_FACTORY,
    values,
    objectStack,
    orderedKeys,
  );
}