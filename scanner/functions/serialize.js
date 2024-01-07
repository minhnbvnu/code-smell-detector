function serialize(
  serializersNS,
  nodeFactory,
  values,
  objectStack,
  keys,
  thisArg,
) {
  const length = (keys !== undefined ? keys : values).length;
  let value, node;
  for (let i = 0; i < length; ++i) {
    value = values[i];
    if (value !== undefined) {
      node = nodeFactory.call(
        thisArg !== undefined ? thisArg : this,
        value,
        objectStack,
        keys !== undefined ? keys[i] : undefined,
      );
      if (node !== undefined) {
        serializersNS[node.namespaceURI][node.localName].call(
          thisArg,
          node,
          value,
          objectStack,
        );
      }
    }
  }
}