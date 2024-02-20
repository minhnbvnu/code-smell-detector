function PromiseForEach(arr, cb) {
  let realResult = []
  let result = Promise.resolve()
  arr.forEach((a, index) => {
    result = result.then(() => {
      return cb(a).then(res => {
        realResult.push(res)
      })
    })
  })
  return result.then(() => {
    return realResult
  })
}