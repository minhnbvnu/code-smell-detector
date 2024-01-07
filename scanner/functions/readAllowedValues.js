function readAllowedValues(node, objectStack) {
  return pushParseAndPop({}, ALLOWED_VALUES_PARSERS, node, objectStack);
}