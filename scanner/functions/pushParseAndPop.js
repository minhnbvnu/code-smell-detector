function pushParseAndPop(object, parsersNS, node, objectStack, thisArg) {
  objectStack.push(object);
  parseNode(parsersNS, node, objectStack, thisArg);
  return /** @type {T} */ (objectStack.pop());
}