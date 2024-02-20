function verifyPurge(t, tx) {
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
                ['MessageBroker/RabbitMQ/Queue/Purge/Temp', ['Callback: <anonymous>']]
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
      'MessageBroker/RabbitMQ/Queue/Purge/Temp'
    ]
  } else {
    segments = [
      'Channel#assertExchange',
      ['Channel#assertQueue', ['Channel#bindQueue', ['MessageBroker/RabbitMQ/Queue/Purge/Temp']]]
    ]
  }

  t.assertSegments(tx.trace.root, segments, 'should have expected segments')

  t.assertMetrics(tx.metrics, [[{ name: 'MessageBroker/RabbitMQ/Queue/Purge/Temp' }]], false, false)
}