function addTests(name, speccer) {
  const middleware = recordFunc(speccer())

  suite.add({
    name: name + ' - function middleware',
    fn: function () {
      return recordFunc(speccer())
    }
  })

  suite.add({
    name: name + ' - property middleware',
    fn: function () {
      return recordProperty(speccer())
    }
  })

  suite.add({
    name: name + ' - mixed middleware   ',
    fn: function () {
      return randomRecord(speccer())
    }
  })

  suite.add({
    name: name + ' - wrapper (no tx)    ',
    fn: function () {
      contextManager.setContext(null)
      middleware(getReqd(), {}, noop)
    }
  })

  suite.add({
    name: name + ' - wrapper (tx)       ',
    fn: function () {
      contextManager.setContext(transaction.trace.root)
      middleware(getReqd(), {}, noop)
    }
  })
}