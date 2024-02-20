function replaceStubs(stubs, string) {
  let result = string
  stubs.forEach((v, k) => {
    result = result.replace(k, v)
  })
  return result
}