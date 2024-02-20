function badcheck () {
    var x, y, h, b, b1
    var thisbad = 0
    var bw = 0

    // blocks of same color.
    for (y = 0; y < width - 1; y++) {
      for (x = 0; x < width - 1; x++) {
        if ((qrframe[x + width * y] && qrframe[(x + 1) + width * y] &&
                     qrframe[x + width * (y + 1)] && qrframe[(x + 1) + width * (y + 1)]) || // all black
                    !(qrframe[x + width * y] || qrframe[(x + 1) + width * y] ||
                         qrframe[x + width * (y + 1)] || qrframe[(x + 1) + width * (y + 1)])) // all white
        { thisbad += N2 }
      }
    }

    // X runs
    for (y = 0; y < width; y++) {
      rlens[0] = 0
      for (h = b = x = 0; x < width; x++) {
        if ((b1 = qrframe[x + width * y]) == b) { rlens[h]++ } else { rlens[++h] = 1 }
        b = b1
        bw += b ? 1 : -1
      }
      thisbad += badruns(h)
    }

    // black/white imbalance
    if (bw < 0) { bw = -bw }

    var big = bw
    var count = 0
    big += big << 2
    big <<= 1
    while (big > width * width) { big -= width * width, count++ }
    thisbad += count * N4

    // Y runs
    for (x = 0; x < width; x++) {
      rlens[0] = 0
      for (h = b = y = 0; y < width; y++) {
        if ((b1 = qrframe[x + width * y]) == b) { rlens[h]++ } else { rlens[++h] = 1 }
        b = b1
      }
      thisbad += badruns(h)
    }
    return thisbad
  }