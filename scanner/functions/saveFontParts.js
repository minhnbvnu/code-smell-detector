function saveFontParts(name, value) {
        var e_10, _a;
        try {
            for (var _b = __values(Styles.connect[name].children), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                var cname = this.childName(name, child);
                if (Array.isArray(value[child])) {
                    var values = value[child];
                    if (values.length) {
                        this.styles[cname] = values.join(' ');
                    }
                }
                else if (value[child] !== '') {
                    this.styles[cname] = value[child];
                }
            }
        }
        catch (e_10_1) {
            e_10 = { error: e_10_1 };
        }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return))
                    _a.call(_b);
            }
            finally {
                if (e_10)
                    throw e_10.error;
            }
        }
    }