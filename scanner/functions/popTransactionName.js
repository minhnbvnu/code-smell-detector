function popTransactionName(pathSegment) {
  const tx = this.tracer.getTransaction()
  if (tx && tx.nameState) {
    tx.nameState.popPath(pathSegment)
  }
}