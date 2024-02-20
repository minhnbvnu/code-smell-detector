function copyWithDelete(obj, path, index = 0) {
  const key = path[index];
  const updated = Object(shared_isArray__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(obj) ? obj.slice() : { ...obj
  };

  if (index + 1 === path.length) {
    if (Object(shared_isArray__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(updated)) {
      updated.splice(key, 1);
    } else {
      delete updated[key];
    }
  } else {
    // $FlowFixMe number or string is fine here
    updated[key] = copyWithDelete(obj[key], path, index + 1);
  }

  return updated;
}