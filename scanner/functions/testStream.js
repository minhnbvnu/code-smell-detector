function testStream(t, method, src, out) {
  const agent = setupAgent(t)
  helper.runInTransaction(agent, function (transaction) {
    const concatStream = concat(check)

    // The check callback is called when the stream finishes.
    const stream = zlib[method]()
    stream.pipe(concatStream)
    stream.end(src)

    function check(result) {
      t.equal(result.toString('base64'), out, 'should have correct result')
      t.equal(agent.getTransaction(), transaction)
      t.end()
    }
  })
}