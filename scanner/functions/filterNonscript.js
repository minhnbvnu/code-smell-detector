function filterNonscript(_a) {
        var e_1, _b;
        var data = _a.data;
        try {
            for (var _c = __values(data.getList('nonscript')), _d = _c.next(); !_d.done; _d = _c.next()) {
                var mml = _d.value;
                if (mml.attributes.get('scriptlevel') > 0) {
                    var parent_1 = mml.parent;
                    parent_1.childNodes.splice(parent_1.childIndex(mml), 1);
                    data.removeFromList(mml.kind, [mml]);
                    if (mml.isKind('mrow')) {
                        var mstyle = mml.childNodes[0];
                        data.removeFromList('mstyle', [mstyle]);
                        data.removeFromList('mspace', mstyle.childNodes[0].childNodes);
                    }
                }
                else if (mml.isKind('mrow')) {
                    mml.parent.replaceChild(mml.childNodes[0], mml);
                    data.removeFromList('mrow', [mml]);
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