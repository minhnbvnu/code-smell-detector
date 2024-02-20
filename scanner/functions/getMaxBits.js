function getMaxBits() {
    var maxbits = 0;
    var oldi = 1;
    var newi = 2;
    while (oldi != newi) {
      maxbits++;
      oldi = newi;
      newi = newi << 1;
    }
    return maxbits;
  }