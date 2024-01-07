function hexToInt(a, size) {
    var n = 0;

    for (var i = 0; i <= size; i++) {
      n = n << 8 | a[i];
    }

    return n >>> 0;
  }