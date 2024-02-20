function writeBits(bs) {
    var value = bs[0];
    var posval = bs[1] - 1;
    while (posval >= 0) {
      if (value & (1 << posval)) {
        bytenew |= 1 << bytepos;
      }
      posval--;
      bytepos--;
      if (bytepos < 0) {
        if (bytenew == 0xff) {
          writeByte(0xff);
          writeByte(0);
        } else {
          writeByte(bytenew);
        }
        bytepos = 7;
        bytenew = 0;
      }
    }
  }