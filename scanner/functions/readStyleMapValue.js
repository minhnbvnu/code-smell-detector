function readStyleMapValue(node, objectStack) {
  return pushParseAndPop(undefined, STYLE_MAP_PARSERS, node, objectStack, this);
}