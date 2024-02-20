function transactionWrapper(transaction) {
    let count = 0
    const socket = net.createConnection({ port: 4123 })
    socket.on('data', function onData(data) {
      t.equal(id(agent.getTransaction()), id(transaction), 'should maintain tx')
      t.equal(data.toString(), 'end data')
      ++count
    })
    socket.on('end', function onEnd() {
      t.equal(id(agent.getTransaction()), id(transaction), 'should maintain tx')
      t.equal(count, 1)
      setTimeout(verify, 0)
    })

    socket.on('connect', function onConnet() {
      t.equal(id(agent.getTransaction()), id(transaction), 'should maintain tx')
      socket.write('some data')
      socket.end()
    })

    function verify() {
      if (!t.passing()) {
        return t.end()
      }

      const root = agent.getTransaction().trace.root
      t.equal(root.children.length, 1, 'should have a single child')
      let connectSegment = root.children[0]
      t.equal(
        connectSegment.name,
        'net.createConnection',
        'connect segment should have correct name'
      )
      t.ok(connectSegment.timer.touched, 'connect should started and ended')

      // Depending on the version of Node there may be another connection segment
      // floating in the trace.
      if (connectSegment.children[0].name === 'net.Socket.connect') {
        connectSegment = connectSegment.children[0]
      }

      t.equal(connectSegment.children.length, 2, 'connect should have a two child segment')
      const dnsSegment = connectSegment.children[0]
      const timeoutSegment = connectSegment.children[1]

      t.equal(dnsSegment.name, 'dns.lookup', 'dns segment should have correct name')
      t.ok(dnsSegment.timer.touched, 'dns segment should started and ended')
      t.equal(dnsSegment.children.length, 1, 'dns should have a single callback segment')
      t.equal(timeoutSegment.name, 'timers.setTimeout', 'timeout segment should have correct name')
      t.ok(timeoutSegment.timer.touched, 'timeout should started and ended')
      t.equal(timeoutSegment.children.length, 1, 'timeout should have a single callback segment')
      t.end()
    }
  }