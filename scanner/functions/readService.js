function readService(node, objectStack) {
  return pushParseAndPop({}, SERVICE_PARSERS, node, objectStack);
}