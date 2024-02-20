function change(x) {
    if (resolve) resolve(x), resolve = null;
    else stale = true;
    return value = x;
  }