function configMacros(jax) {
        var e_1, _a;
        var handler = jax.parseOptions.handlers.retrieve(MACROSMAP);
        var macros = jax.parseOptions.options.macros;
        try {
            for (var _b = __values(Object.keys(macros)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var cs = _c.value;
                var def = (typeof macros[cs] === 'string' ? [macros[cs]] : macros[cs]);
                var macro = Array.isArray(def[2]) ?
                    new Symbol_js_1.Macro(cs, NewcommandMethods_js_1.default.MacroWithTemplate, def.slice(0, 2).concat(def[2])) :
                    new Symbol_js_1.Macro(cs, NewcommandMethods_js_1.default.Macro, def);
                handler.add(cs, macro);
            }
        }
        catch (e_1_1) {
            e_1 = { error: e_1_1 };
        }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return))
                    _a.call(_b);
            }
            finally {
                if (e_1)
                    throw e_1.error;
            }
        }
    }