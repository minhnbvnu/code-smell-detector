function fixPrescripts(_a) {
        var e_2, _b, e_3, _c, e_4, _d;
        var data = _a.data;
        try {
            for (var _e = __values(data.getList('mmultiscripts')), _f = _e.next(); !_f.done; _f = _e.next()) {
                var node = _f.value;
                if (!node.getProperty('fixPrescript'))
                    continue;
                var childNodes = NodeUtil_js_1.default.getChildren(node);
                var n = 0;
                try {
                    for (var _g = (e_3 = void 0, __values([1, 2])), _h = _g.next(); !_h.done; _h = _g.next()) {
                        var i = _h.value;
                        if (!childNodes[i]) {
                            NodeUtil_js_1.default.setChild(node, i, data.nodeFactory.create('node', 'none'));
                            n++;
                        }
                    }
                }
                catch (e_3_1) {
                    e_3 = { error: e_3_1 };
                }
                finally {
                    try {
                        if (_h && !_h.done && (_c = _g.return))
                            _c.call(_g);
                    }
                    finally {
                        if (e_3)
                            throw e_3.error;
                    }
                }
                try {
                    for (var _j = (e_4 = void 0, __values([4, 5])), _k = _j.next(); !_k.done; _k = _j.next()) {
                        var i = _k.value;
                        if (NodeUtil_js_1.default.isType(childNodes[i], 'mrow') && NodeUtil_js_1.default.getChildren(childNodes[i]).length === 0) {
                            NodeUtil_js_1.default.setChild(node, i, data.nodeFactory.create('node', 'none'));
                        }
                    }
                }
                catch (e_4_1) {
                    e_4 = { error: e_4_1 };
                }
                finally {
                    try {
                        if (_k && !_k.done && (_d = _j.return))
                            _d.call(_j);
                    }
                    finally {
                        if (e_4)
                            throw e_4.error;
                    }
                }
                if (n === 2) {
                    childNodes.splice(1, 2);
                }
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
    }