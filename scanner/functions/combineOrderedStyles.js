function combineOrderedStyles(customMap, defaults) {
  if (customMap == null) {
    return defaults;
  }

  var _defaults = _slicedToArray(defaults, 2),
      defaultStyleMap = _defaults[0],
      defaultStyleOrder = _defaults[1];

  var styleMap = Object.assign({}, defaultStyleMap);
  var styleOrder = [].concat(_toConsumableArray(defaultStyleOrder));
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.keys(customMap)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _styleName = _step.value;

      if (defaultStyleMap.hasOwnProperty(_styleName)) {
        var defaultStyles = defaultStyleMap[_styleName];
        styleMap[_styleName] = Object.assign({}, defaultStyles, customMap[_styleName]);
      } else {
        styleMap[_styleName] = customMap[_styleName];
        styleOrder.push(_styleName);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return [styleMap, styleOrder];
}