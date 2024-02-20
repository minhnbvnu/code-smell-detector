function generate_random_base() {
  var ret = '';
  var charRanges = {
    48 : 57,
    65 : 90,
    97 : 122
  }

  for (lower in charRanges) {
    for (var i = lower; i <= charRanges[lower]; i++) {
      ret += String.fromCharCode(i);
    }
  }

  return '.' + ret + '_';
}