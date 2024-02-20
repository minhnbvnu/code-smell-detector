function nullSegmentBind() {
  const test = shared.getTest()
  test.func = tracer.bindFunction(test.func, null, Math.random() > 0.5)
}