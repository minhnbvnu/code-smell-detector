function processData(key, value, klass, styles, events, rest, listen) {
  var m = matchClassProperty(key);

  if (m) {
    if (m === true) {
      klass.push(value);
    } else {
      if (value) {
        klass.push(m);
      }
    }

    return;
  }

  m = matchStyleProperty(key);

  if (m) {
    if (m === true) {
      styles.push(value);
    } else {
      if (value !== '' && value != null) {
        styles.push(__WEBPACK_IMPORTED_MODULE_2__babel_runtime_helpers_defineProperty___default()({}, m, value));
      }
    }

    return;
  }

  var isFn = typeof value === 'function';

  if (matchEventProperty(key) && isFn) {
    if (!Object(__WEBPACK_IMPORTED_MODULE_4__obx_utils__["k" /* hasOwnProperty */])(events, key)) {
      events[key] = [value];
    } else {
      events[key].push(value);
    }

    return;
  }

  rest[key] = isFn ? listen(value) : value;
}