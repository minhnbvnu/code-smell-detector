function verifyGet(t, tx, exchangeName, routingKey, queue) {
  const isCallback = !!metrics.findSegment(tx.trace.root, 'Callback: <anonymous>')
  const produceName = 'MessageBroker/RabbitMQ/Exchange/Produce/Named/' + exchangeName
  const consumeName = 'MessageBroker/RabbitMQ/Exchange/Consume/Named/' + queue
  if (isCallback) {
    t.assertSegments(tx.trace.root, [produceName, consumeName, ['Callback: <anonymous>']])
  } else {
    t.assertSegments(tx.trace.root, [produceName, consumeName])
  }
  t.assertMetrics(tx.metrics, [[{ name: produceName }], [{ name: consumeName }]], false, false)
}