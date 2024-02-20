function maybeAddDtCatHeaders({ agent, request, transaction, transport }) {
  if (agent.config.distributed_tracing.enabled) {
    // Node http headers are automatically lowercase
    transaction.acceptDistributedTraceHeaders(transport, request.headers)
  } else if (agent.config.cross_application_tracer.enabled) {
    const { id, transactionId } = cat.extractCatHeaders(request.headers)
    const { externalId, externalTransaction } = cat.parseCatData(
      id,
      transactionId,
      agent.config.encoding_key
    )
    cat.assignCatToTransaction(externalId, externalTransaction, transaction)
  }
}