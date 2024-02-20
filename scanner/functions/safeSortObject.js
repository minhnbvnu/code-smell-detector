function safeSortObject(value, seen) {
  // return non-object value as is
  if (value === null || _typeof(value) !== 'object') {
    return value;
  } // return date, regexp and react element values as is


  if (value instanceof Date || value instanceof RegExp || /*#__PURE__*/React__namespace.isValidElement(value)) {
    return value;
  }

  seen.add(value); // make a copy of array with each item passed through the sorting algorithm

  if (Array.isArray(value)) {
    return value.map(function (v) {
      return safeSortObject(v, seen);
    });
  } // make a copy of object with key sorted


  return Object.keys(value).sort().reduce(function (result, key) {
    if (key === '_owner') {
      return result;
    }

    if (key === 'current' || seen.has(value[key])) {
      // eslint-disable-next-line no-param-reassign
      result[key] = '[Circular]';
    } else {
      // eslint-disable-next-line no-param-reassign
      result[key] = safeSortObject(value[key], seen);
    }

    return result;
  }, {});
}