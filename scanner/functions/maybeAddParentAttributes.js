function maybeAddParentAttributes(transaction, attributes) {
  if (transaction.parentSpanId) {
    attributes.parentSpanId = transaction.parentSpanId
  }

  if (transaction.parentId) {
    attributes.parentId = transaction.parentId
  }
}