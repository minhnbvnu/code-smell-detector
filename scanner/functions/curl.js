function curl(request) {
            var curlified = [];
            var type = "";
            var headers = request.get("headers");
            curlified.push("curl");
            curlified.push("-X", request.get("method"));
            curlified.push('"' + request.get("url") + '"');
            if (headers && headers.size) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;
                try {
                    for (var _iterator = (0, _getIterator3.default)(request.get("headers").entries()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var p = _step.value;
                        var _p = (0, _slicedToArray3.default)(p, 2),
                            h = _p[0],
                            v = _p[1];
                        type = v;
                        curlified.push("-H ");
                        curlified.push('"' + h + ": " + v + '"')
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
            }
            if (request.get("body")) {
                if (type === "multipart/form-data" && request.get("method") === "POST") {
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;
                    try {
                        for (var _iterator2 = (0, _getIterator3.default)(request.get("body").entrySeq()), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var _step2$value = (0, _slicedToArray3.default)(_step2.value, 2),
                                k = _step2$value[0],
                                v = _step2$value[1];
                            curlified.push("-F");
                            if (v instanceof _window2.default.File) {
                                curlified.push('"' + k + "=@" + v.name + ";type=" + v.type + '"')
                            } else {
                                curlified.push('"' + k + "=" + v + '"')
                            }
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return()
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2
                            }
                        }
                    }
                } else {
                    curlified.push("-d");
                    curlified.push((0, _stringify2.default)(request.get("body")).replace(/\\n/g, ""))
                }
            }
            return curlified.join(" ")
        }