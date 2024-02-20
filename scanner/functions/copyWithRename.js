function copyWithRename(obj, oldPath, newPath, index = 0) {
  const oldKey = oldPath[index];
  const updated = Object(shared_isArray__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(obj) ? obj.slice() : { ...obj
  };

  if (index + 1 === oldPath.length) {
    const newKey = newPath[index]; // $FlowFixMe number or string is fine here

    updated[newKey] = updated[oldKey];

    if (Object(shared_isArray__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(updated)) {
      updated.splice(oldKey, 1);
    } else {
      delete updated[oldKey];
    }
  } else {
    // $FlowFixMe number or string is fine here
    updated[oldKey] = copyWithRename(obj[oldKey], oldPath, newPath, index + 1);
  }

  return updated;
}