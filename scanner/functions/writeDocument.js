function writeDocument(node, features, objectStack) {
  const /** @type {import("../xml.js").NodeStackItem} */ context = {node: node};
  pushSerializeAndPop(
    context,
    DOCUMENT_SERIALIZERS,
    DOCUMENT_NODE_FACTORY,
    features,
    objectStack,
    undefined,
    this,
  );
}