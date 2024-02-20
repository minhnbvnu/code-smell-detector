function ismasked (x, y) {
    var bt
    if (x > y) {
      bt = x
      x = y
      y = bt
    }
    bt = y
    bt += y * y
    bt >>= 1
    bt += x
    return framask[bt]
  }