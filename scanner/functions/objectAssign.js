function objectAssign(target) {
  for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sources[_key - 1] = arguments[_key];
  }

  if (Object.assign) {
    return Object.assign.apply(Object, [target].concat(sources));
  }

  for (var i = 0, l = sources.length; i < l; i++) {
    var source = sources[i];

    for (var key in source) {
      if (hasOwnProperty(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
}