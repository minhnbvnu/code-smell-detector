function setTransactionName(name) {
  const tx = this.tracer.getTransaction()
  if (tx) {
    tx.setPartialName(name)
  }
}