function iterTimes(func) {
    for (var i = 0, c = popCount(); i < c; ++i) func(i, i == c - 1);
  }