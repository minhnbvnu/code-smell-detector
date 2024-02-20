function runMultiple(count, fn, cb) {
  let finished = 0
  for (let i = 0; i < count; ++i) {
    fn(i, function runMultipleCallback() {
      if (++finished >= count) {
        cb()
      }
    })
  }
}