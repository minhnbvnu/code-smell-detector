function readGet(node, objectStack) {
  const href = readHref(node);
  if (!href) {
    return undefined;
  }
  return pushParseAndPop(
    {'href': href},
    REQUEST_METHOD_PARSERS,
    node,
    objectStack,
  );
}