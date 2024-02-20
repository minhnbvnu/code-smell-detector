function looseEqual(a, b) {
  if (a === b) {
    return true;
  }

  if (!isObject(a) && !isObject(b)) {
    return String(a) === String(b);
  }

  return false;
}