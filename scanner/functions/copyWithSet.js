function copyWithSet(obj, path, value, index = 0) {
  if (index >= path.length) {
    return value;
  }

  const key = path[index];
  const updated = Object(shared_isArray__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(obj) ? obj.slice() : { ...obj
  }; // $FlowFixMe number or string is fine here

  updated[key] = copyWithSet(obj[key], path, value, index + 1);
  return updated;
}