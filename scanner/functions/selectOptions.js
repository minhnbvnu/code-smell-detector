function selectOptions(options) {
        var e_3, _a;
        var keys = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            keys[_i - 1] = arguments[_i];
        }
        var subset = {};
        try {
            for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                var key = keys_1_1.value;
                if (options.hasOwnProperty(key)) {
                    subset[key] = options[key];
                }
            }
        }
        catch (e_3_1) {
            e_3 = { error: e_3_1 };
        }
        finally {
            try {
                if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return))
                    _a.call(keys_1);
            }
            finally {
                if (e_3)
                    throw e_3.error;
            }
        }
        return subset;
    }