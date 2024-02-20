function twoParamBind() {
  const test = shared.getTest()
  Math.random() > 0.5 // rand call so all tests perform same amount of work.
  test.func = tracer.bindFunction(test.func, tx.root)
}