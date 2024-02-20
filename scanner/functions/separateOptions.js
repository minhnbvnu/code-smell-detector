function separateOptions(options) {
        var e_4, _a, e_5, _b;
        var objects = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            objects[_i - 1] = arguments[_i];
        }
        var results = [];
        try {
            for (var objects_1 = __values(objects), objects_1_1 = objects_1.next(); !objects_1_1.done; objects_1_1 = objects_1.next()) {
                var object = objects_1_1.value;
                var exists = {}, missing = {};
                try {
                    for (var _c = (e_5 = void 0, __values(Object.keys(options || {}))), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var key = _d.value;
                        (object[key] === undefined ? missing : exists)[key] = options[key];
                    }
                }
                catch (e_5_1) {
                    e_5 = { error: e_5_1 };
                }
                finally {
                    try {
                        if (_d && !_d.done && (_b = _c.return))
                            _b.call(_c);
                    }
                    finally {
                        if (e_5)
                            throw e_5.error;
                    }
                }
                results.push(exists);
                options = missing;
            }
        }
        catch (e_4_1) {
            e_4 = { error: e_4_1 };
        }
        finally {
            try {
                if (objects_1_1 && !objects_1_1.done && (_a = objects_1.return))
                    _a.call(objects_1);
            }
            finally {
                if (e_4)
                    throw e_4.error;
            }
        }
        results.unshift(options);
        return results;
    }