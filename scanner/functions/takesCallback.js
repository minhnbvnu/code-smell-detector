function takesCallback(cb, name) {
    const segment = contextManager.getContext()
    const args = [].slice.call(arguments, 2)

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

      t.equal(cb.call(inner, segment, args), innerReturn)

      if (segment) {
        t.equal(segment.children.length, 1)
        t.ok(segment.children[0].timer.hrstart)
        t.ok(segment.children[0].timer.hrDuration)
        t.ok(segment.timer.hrDuration)
        segment.transaction.end()
      }
    })

    return returnVal
  }