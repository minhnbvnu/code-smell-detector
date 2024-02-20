function userOptions(options) {
        var defs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            defs[_i - 1] = arguments[_i];
        }
        defs.forEach(function (def) { return insert(options, def, true); });
        return options;
    }