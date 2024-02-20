function sortVersions(a, b) {

  let _a1 = toNum(a), _b1 = toNum(b);
  if (_a1 !== _b1) return _a1 - _b1;
  else {
    _a2 = toChar(a).charCodeAt(0).toString(16);
    _b2 = toChar(b).charCodeAt(0).toString(16);
    return _a2 - _b2;
  }
}