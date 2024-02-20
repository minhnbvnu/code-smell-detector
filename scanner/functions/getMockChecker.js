function getMockChecker(mark, path) {
  if (path === void 0) {
    path = [];
  }

  switch (mark.$s_type) {
    case 'and':
      {
        var checkers_4 = mark.$s_param.map(function (m) {
          return getMockChecker(m, path);
        });
        return function (original) {
          var result = checkers_4.map(function (c) {
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
        var checkers_5 = mark.$s_param.map(function (m) {
          return getMockChecker(m, path);
        });
        return function (original) {
          var result = checkers_5.map(function (c) {
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
            return getMockChecker(mark.$s_param, path.concat(["" + i]))(v);
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
        var param_2 = mark.$s_param;
        var paramKeys_2 = Object.keys(param_2);
        var checkers_6 = paramKeys_2.map(function (k) {
          return [k, getMockChecker(param_2[k], path.concat([k]))];
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

          var result = checkers_6.map(function (_a) {
            var k = _a[0],
                c = _a[1];
            return c(o[k]);
          });
          var errors = result.filter(Boolean);

          if (errors.length > 0) {
            var corrected_2 = {};
            result.forEach(function (r, i) {
              var key = paramKeys_2[i];
              corrected_2[key] = r && 'corrected' in r ? r.corrected : o[key];
            });
            errorMsgs.push.apply(errorMsgs, errors.map(function (e) {
              return e.errorMsg;
            }));
            return {
              corrected: corrected_2,
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
            corrected: Object(__WEBPACK_IMPORTED_MODULE_2__mock_index__["c" /* stringGenerator */])(mark.$s_mock),
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
            corrected: Object(__WEBPACK_IMPORTED_MODULE_2__mock_index__["b" /* numberGenerator */])(mark.$s_mock),
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
            corrected: Object(__WEBPACK_IMPORTED_MODULE_2__mock_index__["a" /* booleanGenerator */])(mark.$s_mock),
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