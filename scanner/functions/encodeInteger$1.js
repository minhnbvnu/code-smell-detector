function encodeInteger$1(num) {
    var result = "";
    num = num < 0 ? -num << 1 | 1 : num << 1;
    do {
      var clamped = num & 31;
      num >>>= 5;
      if (num > 0) {
        clamped |= 32;
      }
      result += chars$1[clamped];
    } while (num > 0);
    return result;
  }