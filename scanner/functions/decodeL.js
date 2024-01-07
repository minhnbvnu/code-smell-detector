function decodeL(L) {
    if (L < 0) {
      return -decodeL(-L);
    }

    if (L > 8.0) {
      return ((L + 16) / 116) ** 3;
    }

    return L * DECODE_L_CONSTANT;
  }