function getProdChecker(mark, path) {
  if (path === void 0) {
    path = [];
  }

  switch (mark.$s_type) {
    case 'and':
      {
        var checkers_1 = mark.$s_param.map(function (m) {
          return getProdChecker(m, path);
        });
        return function (original) {
          var result = checkers_1.map(function (c) {
            return c(original);
          });
          var errors = result.filter(Boolean);

          if (errors.length > 0) {
            return {
              errorMsg: errors.map(function (e) {
                return e.errorMsg;
              }).join('\n\tand '),
              original: original
            };
          }

          return;
        };
      }

    case 'or':
      {
        var checkers_2 = mark.$s_param.map(function (m) {
          return getProdChecker(m, path);
        });
        return function (original) {
          var result = checkers_2.map(function (c) {
            return c(original);
          });
          var errors = result.filter(Boolean);

          if (errors.length === result.length) {
            return {
              errorMsg: errors.map(function (e) {
                return e.errorMsg;
              }).join('\n\tor '),
              original: original
            };
          }

          return;
        };
      }

    case 'array':
      {
        return function (original) {
          var errorMsgs = [];

          if (original == null && mark.$s_optional) {
            return;
          }

          var o = original;

          if (!Object(__WEBPACK_IMPORTED_MODULE_1__utils__["b" /* isArray */])(original)) {
            if (false) {
              return {
                corrected: Array.from ? Array.from(original || []) : [],
                errorMsg: createErrorMsg('array', original, path),
                original: original
              };
            } else {
              o = Array.from ? Array.from(original) : [];
              errorMsgs.push(createErrorMsg('array', original, path));
            }
          }

          var result = o.map(function (v, i) {
            return getProdChecker(mark.$s_param, path.concat(["" + i]))(v);
          });
          var errors = result.filter(Boolean);

          if (errors.length > 0) {
            return {
              corrected: result.map(function (r, i) {
                return r && 'corrected' in r ? r.corrected : o[i];
              }),
              errorMsg: errors.map(function (e) {
                return e.errorMsg;
              }).join('\n\tand '),
              original: original
            };
          }

          return;
        };
      }

    case 'object':
      {
        var param_1 = mark.$s_param;
        var paramKeys_1 = Object.keys(param_1);
        var checkers_3 = paramKeys_1.map(function (k) {
          return [k, getProdChecker(param_1[k], path.concat([k]))];
        });
        return function (original) {
          var errorMsgs = [];

          if (original == null && mark.$s_optional) {
            return;
          }

          var o = original;

          if (!Object(__WEBPACK_IMPORTED_MODULE_1__utils__["g" /* isObject */])(original)) {
            if (false) {
              return {
                corrected: {},
                errorMsg: createErrorMsg('object', original, path),
                original: original
              };
            } else {
              o = {};
              errorMsgs.push(createErrorMsg('object', original, path));
            }
          }

          var result = checkers_3.map(function (_a) {
            var k = _a[0],
                c = _a[1];
            return c(o[k]);
          });
          var errors = result.filter(Boolean);

          if (errors.length > 0) {
            var corrected_1 = {};
            result.forEach(function (r, i) {
              var key = paramKeys_1[i];
              corrected_1[key] = r && 'corrected' in r ? r.corrected : o[key];
            });
            errorMsgs.push.apply(errorMsgs, errors.map(function (e) {
              return e.errorMsg;
            }));
            return {
              corrected: corrected_1,
              errorMsg: errorMsgs.join('\n\tand '),
              original: original
            };
          }

          return;
        };
      }

    case 'string':
      return function (original) {
        if (original == null && mark.$s_optional) {
          return;
        }

        if (!Object(__WEBPACK_IMPORTED_MODULE_1__utils__["h" /* isString */])(original)) {
          return {
            corrected: Object(__WEBPACK_IMPORTED_MODULE_1__utils__["f" /* isNumber */])(original) ? "" + original : Object(__WEBPACK_IMPORTED_MODULE_1__utils__["g" /* isObject */])(original) && original.toString ? original.toString() : original ? "" + original : '',
            errorMsg: createErrorMsg('string', original, path),
            original: original
          };
        }

        return;
      };

    case 'number':
      return function (original) {
        if (original == null && mark.$s_optional) {
          return;
        }

        if (!Object(__WEBPACK_IMPORTED_MODULE_1__utils__["f" /* isNumber */])(original)) {
          return {
            corrected: Number(original) || 0,
            errorMsg: createErrorMsg('number', original, path),
            original: original
          };
        }

        return;
      };

    case 'boolean':
      return function (original) {
        if (!Object(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* isBoolean */])(original)) {
          return {
            corrected: !!original,
            errorMsg: createErrorMsg('boolean', original, path),
            original: original
          };
        }

        return;
      };

    case 'undefined':
      return function (original) {
        if (original !== undefined) {
          return {
            errorMsg: createErrorMsg('undefined', original, path),
            original: original
          };
        }

        return;
      };

    case 'null':
      return function (original) {
        if (original !== null) {
          return {
            errorMsg: createErrorMsg('null', original, path),
            original: original
          };
        }

        return;
      };

    default:
      Object(__WEBPACK_IMPORTED_MODULE_0__notification_console__["a" /* ignorableError */])("expect getChecker with a known mark but receiving " + mark);

    case 'any':
      return __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* EMPTY_FUNC */];
  }
}