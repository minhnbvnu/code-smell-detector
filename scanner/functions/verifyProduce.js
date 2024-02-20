function verifyProduce(t, tx, exchangeName, routingKey) {
  const isCallback = !!metrics.findSegment(tx.trace.root, 'Callback: <anonymous>')
  let segments = []

  if (isCallback) {
    segments = [
      'Channel#assertExchange',
      [
        'Callback: <anonymous>',
        [
          'Channel#assertQueue',
          [
            'Callback: <anonymous>',
            [
              'Channel#bindQueue',
              [
                'Callback: <anonymous>',
                ['MessageBroker/RabbitMQ/Exchange/Produce/Named/' + exchangeName]
              ]
            ]
          ]
        ]
      ]
    ]
    // 0.9.0 flattened the segment tree
    // See: https://github.com/amqp-node/amqplib/pull/635/files
  } else if (semver.gte(pkgVersion, '0.9.0')) {
    segments = [
      'Channel#assertExchange',
      'Channel#assertQueue',
      'Channel#bindQueue',
      'MessageBroker/RabbitMQ/Exchange/Produce/Named/' + exchangeName
    ]
  } else {
    segments = [
      'Channel#assertExchange',
      [
        'Channel#assertQueue',
        ['Channel#bindQueue', ['MessageBroker/RabbitMQ/Exchange/Produce/Named/' + exchangeName]]
      ]
    ]
  }

  t.assertSegments(tx.trace.root, segments, 'should have expected segments')

  t.assertMetrics(
    tx.metrics,
    [[{ name: 'MessageBroker/RabbitMQ/Exchange/Produce/Named/' + exchangeName }]],
    false,
    false
  )

  const segment = metrics.findSegment(
    tx.trace.root,
    'MessageBroker/RabbitMQ/Exchange/Produce/Named/' + exchangeName
  )
  const attributes = segment.getAttributes()
  if (routingKey) {
    t.equal(attributes.routing_key, routingKey, 'should have routing key')
  } else {
    t.notOk(attributes.routing_key, 'should not have routing key')
  }
}