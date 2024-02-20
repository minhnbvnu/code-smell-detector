function makeWindow() {
            var win = {
                location: {},
                history: {},
                open: function open() {},
                close: function close() {},
                File: function File() {}
            };
            if (typeof window === "undefined") {
                return win
            }
            try {
                win = window;
                var props = ["File", "Blob", "FormData"];
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;
                try {
                    for (var _iterator = (0, _getIterator3.default)(props), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var prop = _step.value;
                        if (prop in window) {
                            win[prop] = window[prop]
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return()
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError
                        }
                    }
                }
            } catch (e) {
                console.error(e)
            }
            return win
        }