function allParamBind() {
  const test = shared.getTest()
  test.func = tracer.bindFunction(test.func, tx.root, Math.random() > 0.5)
}