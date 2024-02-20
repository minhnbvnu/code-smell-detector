function queryWhy(pattern, hoisted) {
  const nohoistPattern = `#${pattern}`;
  const found = [];
  for (var _iterator6 = hoisted, _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
    var _ref13;

    if (_isArray6) {
      if (_i6 >= _iterator6.length) break;
      _ref13 = _iterator6[_i6++];
    } else {
      _i6 = _iterator6.next();
      if (_i6.done) break;
      _ref13 = _i6.value;
    }

    const _ref12 = _ref13;
    const loc = _ref12[0];
    const info = _ref12[1];

    if (info.key === pattern || info.previousPaths.indexOf(pattern) >= 0 || info.key.endsWith(nohoistPattern)) {
      found.push([loc, info]);
    }
  }
  return found;
}