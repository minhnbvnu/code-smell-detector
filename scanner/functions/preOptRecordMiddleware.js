function preOptRecordMiddleware() {
  for (let i = 0; i < 1000; ++i) {
    let m = randomRecord(randomSpec)
    m = typeof m === 'function' ? m : m.func
    for (let j = 0; j < 100; ++j) {
      m(getReqd(), {}, noop)
    }
  }
}