function putalign (x, y) {
    var j

    qrframe[x + width * y] = 1
    for (j = -2; j < 2; j++) {
      qrframe[(x + j) + width * (y - 2)] = 1
      qrframe[(x - 2) + width * (y + j + 1)] = 1
      qrframe[(x + 2) + width * (y + j)] = 1
      qrframe[(x + j + 1) + width * (y + 2)] = 1
    }
    for (j = 0; j < 2; j++) {
      setmask(x - 1, y + j)
      setmask(x + 1, y - j)
      setmask(x - j, y - 1)
      setmask(x + j, y + 1)
    }
  }