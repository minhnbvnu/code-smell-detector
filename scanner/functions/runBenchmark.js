function runBenchmark(agent, cb) {
  let p = Promise.resolve()
  for (let i = 0; i < 300; ++i) {
    p = p.then(function noop() {})
  }
  p.then(cb)
}