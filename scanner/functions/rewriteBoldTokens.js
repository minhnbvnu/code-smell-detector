function rewriteBoldTokens(arg) {
        var e_1, _a;
        try {
            for (var _b = __values(arg.data.getList('fixBold')), _c = _b.next(); !_c.done; _c = _b.next()) {
                var node = _c.value;
                if (NodeUtil_js_1.default.getProperty(node, 'fixBold')) {
                    var variant = NodeUtil_js_1.default.getAttribute(node, 'mathvariant');
                    if (variant == null) {
                        NodeUtil_js_1.default.setAttribute(node, 'mathvariant', TexConstants_js_1.TexConstant.Variant.BOLD);
                    }
                    else {
                        NodeUtil_js_1.default.setAttribute(node, 'mathvariant', BOLDVARIANT[variant] || variant);
                    }
                    NodeUtil_js_1.default.removeProperties(node, 'fixBold');
                }
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