function verifySendToQueue(t, tx) {
  t.assertSegments(tx.trace.root, ['MessageBroker/RabbitMQ/Exchange/Produce/Named/Default'])

  t.assertMetrics(
    tx.metrics,
    [[{ name: 'MessageBroker/RabbitMQ/Exchange/Produce/Named/Default' }]],
    false,
    false
  )

  const segment = metrics.findSegment(
    tx.trace.root,
    'MessageBroker/RabbitMQ/Exchange/Produce/Named/Default'
  )
  const attributes = segment.getAttributes()
  t.equal(attributes.routing_key, 'testQueue', 'should store routing key')
  t.equal(attributes.reply_to, 'my.reply.queue', 'should store reply to')
  t.equal(attributes.correlation_id, 'correlation-id', 'should store correlation id')
}