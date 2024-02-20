function keyvalOptions(attrib, allowed, error) {
            var e_2, _a;
            if (allowed === void 0) {
                allowed = null;
            }
            if (error === void 0) {
                error = false;
            }
            var def = readKeyval(attrib);
            if (allowed) {
                try {
                    for (var _b = __values(Object.keys(def)), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var key = _c.value;
                        if (!allowed.hasOwnProperty(key)) {
                            if (error) {
                                throw new TexError_js_1.default('InvalidOption', 'Invalid option: %1', key);
                            }
                            delete def[key];
                        }
                    }
                }
                catch (e_2_1) {
                    e_2 = { error: e_2_1 };
                }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return))
                            _a.call(_b);
                    }
                    finally {
                        if (e_2)
                            throw e_2.error;
                    }
                }
            }
            return def;
        }