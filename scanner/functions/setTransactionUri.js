function setTransactionUri(uri) {
  const tx = this.tracer.getTransaction()
  if (!tx) {
    return
  }

  tx.nameState.setName(this._metrics.FRAMEWORK, tx.verb, metrics.ACTION_DELIMITER, uri)
}