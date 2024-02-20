function splitTRBL(name) {
        var e_1, _a;
        var parts = splitSpaces(this.styles[name]);
        if (parts.length === 0) {
            parts.push('');
        }
        if (parts.length === 1) {
            parts.push(parts[0]);
        }
        if (parts.length === 2) {
            parts.push(parts[0]);
        }
        if (parts.length === 3) {
            parts.push(parts[1]);
        }
        try {
            for (var _b = __values(Styles.connect[name].children), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                this.setStyle(this.childName(name, child), parts.shift());
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