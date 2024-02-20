function makePluginCallback(name, returnOnTrue) {
        var cbs = s.plugins.callbacks[name] = [];
        s.plugins[name] = function () {
            for (var i = 0, cb; (cb = cbs[i]); i++) {
                if (cb.apply(null, arguments) === true && returnOnTrue) {
                    return true;
                }
            }
            return false;
        };
    }