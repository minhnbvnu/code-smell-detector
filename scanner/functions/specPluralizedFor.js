function specPluralizedFor(count) {
    var str = count + " spec";
    if (count > 1) {
      str += "s"
    }
    return str;
  }