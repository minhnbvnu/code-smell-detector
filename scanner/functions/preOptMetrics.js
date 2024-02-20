function preOptMetrics() {
  for (let i = 0; i < 1000; ++i) {
    const m1 = makeMetrics(i * 10)
    const m2 = makeMetrics(i * 10)
    m1.merge(m2)
  }
}