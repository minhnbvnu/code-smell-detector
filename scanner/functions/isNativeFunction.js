function isNativeFunction(fn) {
  let source = String(fn)
  let index = source.indexOf(nativeCode)
  if (index < 0) return false

  let length = index + nativeCode.length
  return length === source.length
}