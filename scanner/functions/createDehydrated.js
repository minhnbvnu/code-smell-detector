function createDehydrated(type, inspectable, data, cleaned, path) {
  cleaned.push(path);
  const dehydrated = {
    inspectable,
    type,
    preview_long: Object(_utils__WEBPACK_IMPORTED_MODULE_0__[/* formatDataForPreview */ "d"])(data, true),
    preview_short: Object(_utils__WEBPACK_IMPORTED_MODULE_0__[/* formatDataForPreview */ "d"])(data, false),
    name: !data.constructor || data.constructor.name === 'Object' ? '' : data.constructor.name
  };

  if (type === 'array' || type === 'typed_array') {
    dehydrated.size = data.length;
  } else if (type === 'object') {
    dehydrated.size = Object.keys(data).length;
  }

  if (type === 'iterator' || type === 'typed_array') {
    dehydrated.readonly = true;
  }

  return dehydrated;
}