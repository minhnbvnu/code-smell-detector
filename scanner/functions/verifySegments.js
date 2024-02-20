function verifySegments(t, rootSegment, expected) {
  let previous
  for (let i = 0; i < expected.length; i++) {
    const child = expected[i]
    if (typeof child === 'string') {
      const childSegment = findSegment(rootSegment, child)
      if (!childSegment) {
        previous = null
        t.fail(util.format('Segment %s does not have child %s', rootSegment.name, child))
      } else {
        previous = childSegment
      }
    } else if (child && Array.isArray(child)) {
      verifySegments(t, previous, child)
    }
  }
}