function combineWSC(name) {
        var e_7, _a;
        var parts = [];
        try {
            for (var _b = __values(Styles.connect[name].children), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                var value = this.styles[this.childName(name, child)];
                if (value) {
                    parts.push(value);
                }
            }
        }
        catch (e_7_1) {
            e_7 = { error: e_7_1 };
        }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return))
                    _a.call(_b);
            }
            finally {
                if (e_7)
                    throw e_7.error;
            }
        }
        if (parts.length) {
            this.styles[name] = parts.join(' ');
        }
        else {
            delete this.styles[name];
        }
    }