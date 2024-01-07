function pushSerializeAndPop(
  object,
  serializersNS,
  nodeFactory,
  values,
  objectStack,
  keys,
  thisArg,
) {
  objectStack.push(object);
  serialize(serializersNS, nodeFactory, values, objectStack, keys, thisArg);
  return /** @type {O|undefined} */ (objectStack.pop());
}