function currySampled(t, a) {
  return (b) => {
    b = b || a
    t.ok(
      a.sampled === b.sampled && a.priority === b.priority,
      'sampled values and priority persist across transactions'
    )
    a = b
    return b
  }
}