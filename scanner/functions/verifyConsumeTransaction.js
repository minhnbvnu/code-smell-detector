function verifyConsumeTransaction(t, tx, exchange, queue, routingKey) {
  t.doesNotThrow(function () {
    t.assertMetrics(
      tx.metrics,
      [
        [{ name: 'OtherTransaction/Message/RabbitMQ/Exchange/Named/' + exchange }],
        [{ name: 'OtherTransactionTotalTime/Message/RabbitMQ/Exchange/Named/' + exchange }],
        [{ name: 'OtherTransaction/Message/all' }],
        [{ name: 'OtherTransaction/all' }],
        [{ name: 'OtherTransactionTotalTime' }]
      ],
      false,
      false
    )
  }, 'should have expected metrics')

  t.equal(
    tx.getFullName(),
    'OtherTransaction/Message/RabbitMQ/Exchange/Named/' + exchange,
    'should not set transaction name'
  )

  const consume = metrics.findSegment(
    tx.trace.root,
    'OtherTransaction/Message/RabbitMQ/Exchange/Named/' + exchange
  )
  t.equal(consume, tx.baseSegment)

  const attributes = tx.trace.attributes.get(DESTINATIONS.TRANS_TRACE)
  t.equal(
    attributes['message.routingKey'],
    routingKey,
    'should have routing key transaction parameter'
  )
  t.equal(attributes['message.queueName'], queue, 'should have queue name transaction parameter')
}