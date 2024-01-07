function readInsertResults(node, objectStack) {
  return pushParseAndPop([], INSERT_RESULTS_PARSERS, node, objectStack);
}