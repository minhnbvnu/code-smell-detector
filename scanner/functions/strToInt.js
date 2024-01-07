function strToInt(str) {
    var a = 0;

    for (var i = 0; i < str.length; i++) {
      a = a << 8 | str.charCodeAt(i);
    }

    return a >>> 0;
  }