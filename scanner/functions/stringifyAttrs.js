function stringifyAttrs(attrs) {
  if (attrs == null) {
    return '';
  }
  var parts = [];
  var _iteratorNormalCompletion7 = true;
  var _didIteratorError7 = false;
  var _iteratorError7 = undefined;

  try {
    for (var _iterator7 = Object.keys(attrs)[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
      var attrKey = _step7.value;

      var attrValue = attrs[attrKey];
      if (attrKey == "src") {
        attrValue = attrValue.replace(/[?#&].*$/g, "");
      }
      if (attrValue != null) {
        parts.push(' ' + attrKey + '="' + encodeAttr(attrValue + '') + '"');
      }
    }
  } catch (err) {
    _didIteratorError7 = true;
    _iteratorError7 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion7 && _iterator7.return) {
        _iterator7.return();
      }
    } finally {
      if (_didIteratorError7) {
        throw _iteratorError7;
      }
    }
  }

  return parts.join('');
}