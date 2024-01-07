function dateEqual(a, b) {
    if ('date' !== type(b)) return false;
    return sameValue(a.getTime(), b.getTime());
  }