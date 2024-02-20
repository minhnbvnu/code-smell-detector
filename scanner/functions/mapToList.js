function mapToList(map) {
                var keyNames = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "key";
                var collectedKeys = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _immutable2.default.Map();
                if (!_immutable2.default.Map.isMap(map) || !map.size) {
                    return _immutable2.default.List()
                }
                if (!Array.isArray(keyNames)) {
                    keyNames = [keyNames]
                }
                if (keyNames.length < 1) {
                    return map.merge(collectedKeys)
                }
                var list = _immutable2.default.List();
                var keyName = keyNames[0];
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;
                try {
                    for (var _iterator = (0, _getIterator3.default)(map.entries()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var entry = _step.value;
                        var _entry = (0, _slicedToArray3.default)(entry, 2),
                            key = _entry[0],
                            val = _entry[1];
                        var nextList = mapToList(val, keyNames.slice(1), collectedKeys.set(keyName, key));
                        if (_immutable2.default.List.isList(nextList)) {
                            list = list.concat(nextList)
                        } else {
                            list = list.push(nextList)
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
                return list
            }