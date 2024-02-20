function memoImport (func) {
  // Otherwise we get a ReferenceError, but since this function
  // is only ran once for each route, there's no overhead
  const kFuncExecuted = Symbol('kFuncExecuted')
  const kFuncValue = Symbol('kFuncValue')
  func[kFuncExecuted] = false
  return async function () {
    if (!func[kFuncExecuted]) {
      func[kFuncValue] = await func()
      func[kFuncExecuted] = true
    }
    return func[kFuncValue]
  }
}