function verifySubscribe(t, tx, exchange, routingKey) {
  const isCallback = !!metrics.findSegment(tx.trace.root, 'Callback: <anonymous>')

  let segments = []

  if (isCallback) {
    segments = [
      'amqplib.Channel#consume',
      ['Callback: <anonymous>', ['MessageBroker/RabbitMQ/Exchange/Produce/Named/' + exchange]]
    ]
  } else if (NATIVE_PROMISES) {
    segments = [
      'amqplib.Channel#consume',
      'MessageBroker/RabbitMQ/Exchange/Produce/Named/' + exchange
    ]
  } else {
    segments = [
      'amqplib.Channel#consume',
      ['MessageBroker/RabbitMQ/Exchange/Produce/Named/' + exchange]
    ]
  }

  t.assertSegments(tx.trace.root, segments)

  t.assertMetrics(
    tx.metrics,
    [[{ name: 'MessageBroker/RabbitMQ/Exchange/Produce/Named/' + exchange }]],
    false,
    false
  )

  t.notMatch(tx.getFullName(), /^OtherTransaction\/Message/, 'should not set transaction name')

  const consume = metrics.findSegment(
    tx.trace.root,
    'MessageBroker/RabbitMQ/Exchange/Produce/Named/' + exchange
  )
  t.equal(consume.getAttributes().routing_key, routingKey, 'should store routing key')
}