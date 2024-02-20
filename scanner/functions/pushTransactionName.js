function pushTransactionName(pathSegment) {
  const tx = this.tracer.getTransaction()
  if (tx && tx.nameState) {
    tx.nameState.appendPath(pathSegment)
  }
}