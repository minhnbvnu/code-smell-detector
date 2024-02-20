function wrapReturn(seg, value) {
    t.equal(this, outer)
    t.equal(seg.name, 'my segment')
    return Object.create(value)
  }