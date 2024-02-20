function filterCenterOver(_a) {
        var e_1, _b;
        var data = _a.data;
        try {
            for (var _c = __values(data.getList('centerOver')), _d = _c.next(); !_d.done; _d = _c.next()) {
                var base = _d.value;
                var texClass = NodeUtil_js_1.default.getTexClass(base.childNodes[0].childNodes[0]);
                if (texClass !== null) {
                    NodeUtil_js_1.default.setProperties(base.parent.parent.parent.parent.parent.parent, { texClass: texClass });
                }
            }
        }
        catch (e_1_1) {
            e_1 = { error: e_1_1 };
        }
        finally {
            try {
                if (_d && !_d.done && (_b = _c.return))
                    _b.call(_c);
            }
            finally {
                if (e_1)
                    throw e_1.error;
            }
        }
    }