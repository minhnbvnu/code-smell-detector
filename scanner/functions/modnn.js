function modnn (x) {
    while (x >= 255) {
      x -= 255
      x = (x >> 8) + (x & 255)
    }
    return x
  }