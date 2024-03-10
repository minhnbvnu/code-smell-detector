            class_1.prototype.stretchColumn = function (i, W) {
                var e_1, _a, e_2, _b, e_3, _c;
                var stretchy = [];
                try {
                    for (var _d = __values(this.tableRows), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var row = _e.value;
                        var cell = row.getChild(i);
                        if (cell) {
                            var child = cell.childNodes[0];
                            if (child.stretch.dir === 0 &&
                                child.canStretch(2)) {
                                stretchy.push(child);
                            }
                        }
                    }
                }
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (_e && !_e.done && (_a = _d.return))
                            _a.call(_d);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
                }
                var count = stretchy.length;
                var nodeCount = this.childNodes.length;
                if (count && nodeCount > 1) {
                    if (W === null) {
                        W = 0;
                        var all = (count > 1 && count === nodeCount);
                        try {
                            for (var _f = __values(this.tableRows), _g = _f.next(); !_g.done; _g = _f.next()) {
                                var row = _g.value;
                                var cell = row.getChild(i);
                                if (cell) {
                                    var child = cell.childNodes[0];
                                    var noStretch = (child.stretch.dir === 0);
                                    if (all || noStretch) {
                                        var w = child.getBBox(noStretch).w;
                                        if (w > W) {
                                            W = w;
                                        }
                                    }
                                }
                            }
                        }
                        catch (e_2_1) {
                            e_2 = { error: e_2_1 };
                        }
                        finally {
                            try {
                                if (_g && !_g.done && (_b = _f.return))
                                    _b.call(_f);
                            }
                            finally {
                                if (e_2)
                                    throw e_2.error;
                            }
                        }
                    }
                    try {
                        for (var stretchy_1 = __values(stretchy), stretchy_1_1 = stretchy_1.next(); !stretchy_1_1.done; stretchy_1_1 = stretchy_1.next()) {
                            var child = stretchy_1_1.value;
                            child.coreMO().getStretchedVariant([W]);
                        }
                    }
                    catch (e_3_1) {
                        e_3 = { error: e_3_1 };
                    }
                    finally {
                        try {
                            if (stretchy_1_1 && !stretchy_1_1.done && (_c = stretchy_1.return))
                                _c.call(stretchy_1);
                        }
                        finally {
                            if (e_3)
                                throw e_3.error;
                        }
                    }
                }
            };
            class_1.prototype.updateHDW = function (cell, i, j, align, H, D, W, M) {