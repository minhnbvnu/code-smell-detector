function configEnvironments(jax) {
        var e_2, _a;
        var handler = jax.parseOptions.handlers.retrieve(ENVIRONMENTMAP);
        var environments = jax.parseOptions.options.environments;
        try {
            for (var _b = __values(Object.keys(environments)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var env = _c.value;
                handler.add(env, new Symbol_js_1.Macro(env, NewcommandMethods_js_1.default.BeginEnv, [true].concat(environments[env])));
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