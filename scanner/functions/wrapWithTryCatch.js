function wrapWithTryCatch(fn) {
            var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                _ref4$logErrors = _ref4.logErrors,
                logErrors = _ref4$logErrors === undefined ? true : _ref4$logErrors;
            if (typeof fn !== "function") {
                return fn
            }
            return function() {
                try {
                    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                        args[_key3] = arguments[_key3]
                    }
                    return fn.call.apply(fn, [this].concat(args))
                } catch (e) {
                    if (logErrors) {
                        console.error(e)
                    }
                    return null
                }
            }
        }