function setmask (x, y) {
    var bt
    if (x > y) {
      bt = x
      x = y
      y = bt
    }
    // y*y = 1+3+5...
    bt = y
    bt *= y
    bt += y
    bt >>= 1
    bt += x
    framask[bt] = 1
  }