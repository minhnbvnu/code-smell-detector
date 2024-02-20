function setHasEqualElement(set, val1, opts, channel) {
    var i = getIterator$1(set);
    var result;
    while ((result = i.next()) && !result.done) {
      if (internalDeepEqual(val1, result.value, opts, channel)) {
        $setDelete(set, result.value);
        return true;
      }
    }
    return false;
  }