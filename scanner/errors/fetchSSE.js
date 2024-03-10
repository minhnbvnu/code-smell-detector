        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    onMessage = options.onMessage, onError = options.onError, fetchOptions = __rest(options, ["onMessage", "onError"]);
                    return [4 /*yield*/, fetchFn(url, fetchOptions)];
                case 1:
                    res = _g.sent();
                    if (!!res.ok) return [3 /*break*/, 6];
                    reason = void 0;
                    _g.label = 2;
                case 2:
                    _g.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, res.text()];
                case 3:
                    reason = _g.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _g.sent();
                    reason = res.statusText;
                    return [3 /*break*/, 5];
                case 5:
                    msg = "ChatGPT error ".concat(res.status, ": ").concat(reason);
                    error = new types.ChatGPTError(msg, { cause: res });
                    error.statusCode = res.status;
                    error.statusText = res.statusText;
                    throw error;
                case 6:
                    parser = createParser(function (event) {
                        if (event.type === 'event') {
                            onMessage(event.data);
                        }
                    });
                    feed = function (chunk) {
                        var _a;
                        var response = null;
                        try {
                            response = JSON.parse(chunk);
                        }
                        catch (_b) {
                            // ignore
                        }
                        if (((_a = response === null || response === void 0 ? void 0 : response.detail) === null || _a === void 0 ? void 0 : _a.type) === 'invalid_request_error') {
                            var msg = "ChatGPT error ".concat(response.detail.message, ": ").concat(response.detail.code, " (").concat(response.detail.type, ")");
                            var error = new types.ChatGPTError(msg, { cause: response });
                            error.statusCode = response.detail.code;
                            error.statusText = response.detail.message;
                            if (onError) {
                                onError(error);
                            }
                            else {
                                console.error(error);
                            }
                            // don't feed to the event parser
                            return;
                        }
                        parser.feed(chunk);
                    };
                    if (!!res.body.getReader) return [3 /*break*/, 7];
                    body_1 = res.body;
                    if (!body_1.on || !body_1.read) {
                        throw new types.ChatGPTError('unsupported "fetch" implementation');
                    }
                    body_1.on('readable', function () {
                        var chunk;
                        while (null !== (chunk = body_1.read())) {
                            feed(chunk.toString());
                        }
                    });
                    return [3 /*break*/, 18];
                case 7:
                    _g.trys.push([7, 12, 13, 18]);
                    _d = true, _e = __asyncValues(streamAsyncIterable(res.body));
                    _g.label = 8;
                case 8: return [4 /*yield*/, _e.next()];
                case 9:
                    if (!(_f = _g.sent(), _a = _f.done, !_a)) return [3 /*break*/, 11];
                    _c = _f.value;
                    _d = false;
                    chunk = _c;
                    str = new TextDecoder().decode(chunk);
                    feed(str);
                    _g.label = 10;
                case 10:
                    _d = true;
                    return [3 /*break*/, 8];
                case 11: return [3 /*break*/, 18];
                case 12:
                    e_1_1 = _g.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 18];
                case 13:
                    _g.trys.push([13, , 16, 17]);
                    if (!(!_d && !_a && (_b = _e.return))) return [3 /*break*/, 15];
                    return [4 /*yield*/, _b.call(_e)];
                case 14:
                    _g.sent();
                    _g.label = 15;
                case 15: return [3 /*break*/, 17];
                case 16:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 17: return [7 /*endfinally*/];
                case 18: return [2 /*return*/];
            }
        });