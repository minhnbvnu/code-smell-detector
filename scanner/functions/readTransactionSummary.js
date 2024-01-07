function readTransactionSummary(node, objectStack) {
  return pushParseAndPop({}, TRANSACTION_SUMMARY_PARSERS, node, objectStack);
}