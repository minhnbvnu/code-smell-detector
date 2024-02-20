function _sequenceCount(x2) {
  if (Array.isArray(x2)) {
    if (x2.length == 0) {
      return [silence, 0];
    }

    if (x2.length == 1) {
      return _sequenceCount(x2[0]);
    }

    return [_fastcat(...x2.map(a2 => _sequenceCount(a2)[0])), x2.length];
  }

  return [reify(x2), 1];
}