function i2ops (c) {
  var out = Buffer.allocUnsafe(4)
  out.writeUInt32BE(c, 0)
  return out
}