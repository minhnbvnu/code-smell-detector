function objectFilter(obj, predicate) {
  // TODO: Could return the original reference if no values change
  return Object.keys(obj).reduce((newObj, key) => {
    if (predicate(obj[key], key)) {
      newObj[key] = obj[key];
    }

    return newObj;
  }, {});
}