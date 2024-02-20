function callAll(name, a, b, c) {
    const segment = contextManager.getContext()

    if (name) {
      t.equal(segment.name, name)
      t.ok(segment.timer.hrstart)
      t.notOk(segment.timer.hrDuration)
    } else {
      t.equal(segment, null)
    }

    t.equal(this, outer)
    process.nextTick(function next() {
      if (segment) {
        t.equal(segment.children.length, 0)
      }

      t.equal(a.call(inner, segment, 'a'), 'a')
      t.equal(b.call(inner, segment, 'b'), 'b')
      t.equal(c.call(inner, segment, 'c'), 'c')

      if (segment) {
        segment.children.forEach(function (child) {
          t.ok(child.timer.hrstart)
          t.ok(child.timer.hrDuration)
        })
        t.ok(segment.timer.hrDuration)
        segment.transaction.end()
      }
    })

    return returnVal
  }