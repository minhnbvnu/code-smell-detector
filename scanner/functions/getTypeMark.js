function getTypeMark(t) {
  var args = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }

  if (t.$s_type) {
    return t;
  }

  if (!Object(__WEBPACK_IMPORTED_MODULE_2__utils__["h" /* isString */])(t)) {
    Object(__WEBPACK_IMPORTED_MODULE_1__notification_console__["a" /* ignorableError */])("expect getTypeMark() with a string but receiving " + typeof t);
    return;
  }

  var isOptional = t[t.length - 1] === '?';
  var result = {
    $s_type: isOptional ? t.slice(0, t.length - 1) : t
  };
  isOptional && (result.$s_optional = isOptional);

  switch (t) {
    case 'and':
    case 'or':
      result.$s_param = args.map(function (t) {
        return getTypeMark(t);
      });
      delete result.$s_optional;
      break;

    case 'array?':
    case 'array':
      result.$s_param = getTypeMark(args[0] || []);
      break;

    case 'object?':
    case 'object':
      result.$s_param = {};
      var param_1 = args[0];
      Object.keys(param_1 || {}).forEach(function (k) {
        result.$s_param[k] = getTypeMark(param_1[k]);
      });
      break;

    case 'undefined':
    case 'null':
    case 'any':
      result.$s_optional = true;
      break;

    case 'string?':
    case 'string':
    case 'boolean?':
    case 'boolean':
    case 'number?':
    case 'number':
      break;

    default:
      Object(__WEBPACK_IMPORTED_MODULE_1__notification_console__["a" /* ignorableError */])("expect getTypeMark() with a known type but receiving " + t);
      return;
  }

  return result;
}