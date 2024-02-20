function singleLineValues(xs2) {
    for (var i = 0; i < xs2.length; i++) {
      if (indexOf$1(xs2[i], "\n") >= 0) {
        return false;
      }
    }
    return true;
  }