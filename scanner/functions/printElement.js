function printElement (el, options = {}) {
  let maxLevel = options.maxLevel || 1000
  let res = _printElement(el, 1, maxLevel)
  return res
}