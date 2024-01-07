function readDcp(node, objectStack) {
  return pushParseAndPop({}, DCP_PARSERS, node, objectStack);
}