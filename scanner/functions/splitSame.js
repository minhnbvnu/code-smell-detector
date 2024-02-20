function splitSame(name) {
        var e_3, _a;
        try {
            for (var _b = __values(Styles.connect[name].children), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                this.setStyle(this.childName(name, child), this.styles[name]);
            }
        }
        catch (e_3_1) {
            e_3 = { error: e_3_1 };
        }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return))
                    _a.call(_b);
            }
            finally {
                if (e_3)
                    throw e_3.error;
            }
        }
    }