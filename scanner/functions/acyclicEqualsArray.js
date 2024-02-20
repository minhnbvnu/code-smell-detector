function acyclicEqualsArray(a, b) {
    var n = a.length;
    if (n !== b.length) return false;
    for (var i = 0; i < n; ++i) {
      if (!acyclicEqualsU(a[i], b[i])) return false;
    }return true;
  }