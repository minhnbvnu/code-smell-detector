function splitWSC(name) {
        var e_5, _a, e_6, _b;
        var parts = { width: '', style: '', color: '' };
        try {
            for (var _c = __values(splitSpaces(this.styles[name])), _d = _c.next(); !_d.done; _d = _c.next()) {
                var part = _d.value;
                if (part.match(BORDER.width) && parts.width === '') {
                    parts.width = part;
                }
                else if (part.match(BORDER.style) && parts.style === '') {
                    parts.style = part;
                }
                else {
                    parts.color = part;
                }
            }
        }
        catch (e_5_1) {
            e_5 = { error: e_5_1 };
        }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return))
                    _a.call(_c);
            }
            finally {
                if (e_5)
                    throw e_5.error;
            }
        }
        try {
            for (var _e = __values(Styles.connect[name].children), _f = _e.next(); !_f.done; _f = _e.next()) {
                var child = _f.value;
                this.setStyle(this.childName(name, child), parts[child]);
            }
        }
        catch (e_6_1) {
            e_6 = { error: e_6_1 };
        }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return))
                    _b.call(_e);
            }
            finally {
                if (e_6)
                    throw e_6.error;
            }
        }
    }