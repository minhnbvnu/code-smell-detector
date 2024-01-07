function argumentsEqual(a, b, m) {
    if ('arguments' !== type(b)) return false;
    a = [].slice.call(a);
    b = [].slice.call(b);
    return deepEqual(a, b, m);
  }