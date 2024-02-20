function configMathtools(config, jax) {
        var e_1, _a;
        var parser = jax.parseOptions;
        var pairedDelims = parser.options.mathtools.pairedDelimiters;
        try {
            for (var _b = __values(Object.keys(pairedDelims)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var cs = _c.value;
                MathtoolsUtil_js_1.MathtoolsUtil.addPairedDelims(parser, cs, pairedDelims[cs]);
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
        (0, MathtoolsTags_js_1.MathtoolsTagFormat)(config, jax);
    }