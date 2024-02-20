function doSomething(trans, expected) {
    t.same([].slice.call(arguments, 2), expected)
    t.equal(tracer.getTransaction(), trans)
    if (trans) {
      t.equal(contextManager.getContext().name, 'my segment')
    }
  }