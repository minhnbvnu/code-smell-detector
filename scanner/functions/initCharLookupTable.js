function initCharLookupTable() {
    var sfcc = String.fromCharCode;
    for (var i = 0; i < 256; i++) {
      ///// ACHTUNG // 255
      clt[i] = sfcc(i);
    }
  }