function createPropFilter(props, filter) {
  if (Array.isArray(filter)) {
    return function (key) {
      return filter.indexOf(key) === -1;
    };
  } else {
    return function (key) {
      return filter(props[key], key);
    };
  }
}