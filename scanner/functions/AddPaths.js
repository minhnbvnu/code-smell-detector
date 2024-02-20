function AddPaths(font, paths, content) {
        var e_1, _a, e_2, _b;
        try {
            for (var _c = __values(Object.keys(paths)), _d = _c.next(); !_d.done; _d = _c.next()) {
                var c = _d.value;
                var n = parseInt(c);
                SVGFontData.charOptions(font, n).p = paths[n];
            }
        }
        catch (e_1_1) {
            e_1 = { error: e_1_1 };
        }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return))
                    _a.call(_c);
            }
            finally {
                if (e_1)
                    throw e_1.error;
            }
        }
        try {
            for (var _e = __values(Object.keys(content)), _f = _e.next(); !_f.done; _f = _e.next()) {
                var c = _f.value;
                var n = parseInt(c);
                SVGFontData.charOptions(font, n).c = content[n];
            }
        }
        catch (e_2_1) {
            e_2 = { error: e_2_1 };
        }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return))
                    _b.call(_e);
            }
            finally {
                if (e_2)
                    throw e_2.error;
            }
        }
        return font;
    }