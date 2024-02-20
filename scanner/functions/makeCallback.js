function makeCallback(val) {
    return function callback(parent, arg) {
      const segment = contextManager.getContext()
      t.equal(arg, val)
      t.equal(this, inner)
      if (parent) {
        t.ok(segment.timer.hrstart)
        t.notOk(segment.timer.hrDuration)
        t.not(parent.children.indexOf(segment), -1)
      }

      return val
    }
  }