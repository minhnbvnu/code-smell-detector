function nonZero (len) {
  var out = Buffer.allocUnsafe(len)
  var i = 0
  var cache = randomBytes(len * 2)
  var cur = 0
  var num
  while (i < len) {
    if (cur === cache.length) {
      cache = randomBytes(len * 2)
      cur = 0
    }
    num = cache[cur++]
    if (num) {
      out[i++] = num
    }
  }
  return out
}