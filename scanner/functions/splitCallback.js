function splitCallback(cont, n) {
    var countDown = n;
    return function() { if (--countDown == 0) cont(); };
  }