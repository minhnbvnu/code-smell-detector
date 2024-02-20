function noUndefined(parser, name) {
        var e_1, _a;
        var textNode = parser.create('text', '\\' + name);
        var options = parser.options.noundefined || {};
        var def = {};
        try {
            for (var _b = __values(['color', 'background', 'size']), _c = _b.next(); !_c.done; _c = _b.next()) {
                var id = _c.value;
                if (options[id]) {
                    def['math' + id] = options[id];
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
        parser.Push(parser.create('node', 'mtext', [], def, textNode));
    }