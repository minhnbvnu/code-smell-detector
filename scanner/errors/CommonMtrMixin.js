            class_1.prototype.stretchChildren = function (HD) {
                var e_1, _a, e_2, _b, e_3, _c;
                if (HD === void 0) {
                    HD = null;
                }
                var stretchy = [];
                var children = (this.labeled ? this.childNodes.slice(1) : this.childNodes);
                try {
                    for (var children_1 = __values(children), children_1_1 = children_1.next(); !children_1_1.done; children_1_1 = children_1.next()) {
                        var mtd = children_1_1.value;
                        var child = mtd.childNodes[0];
                        if (child.canStretch(1)) {
                            stretchy.push(child);
                        }
                    }
                }
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (children_1_1 && !children_1_1.done && (_a = children_1.return))
                            _a.call(children_1);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
                }
                var count = stretchy.length;
                var nodeCount = this.childNodes.length;
                if (count && nodeCount > 1) {
                    if (HD === null) {
                        var H = 0, D = 0;
                        var all = (count > 1 && count === nodeCount);
                        try {
                            for (var children_2 = __values(children), children_2_1 = children_2.next(); !children_2_1.done; children_2_1 = children_2.next()) {
                                var mtd = children_2_1.value;
                                var child = mtd.childNodes[0];
                                var noStretch = (child.stretch.dir === 0);
                                if (all || noStretch) {
                                    var _d = child.getBBox(noStretch), h = _d.h, d = _d.d;
                                    if (h > H) {
                                        H = h;
                                    }
                                    if (d > D) {
                                        D = d;
                                    }
                                }
                            }
                        }
                        catch (e_2_1) {
                            e_2 = { error: e_2_1 };
                        }
                        finally {
                            try {
                                if (children_2_1 && !children_2_1.done && (_b = children_2.return))
                                    _b.call(children_2);
                            }
                            finally {
                                if (e_2)
                                    throw e_2.error;
                            }
                        }
                        HD = [H, D];
                    }
                    try {
                        for (var stretchy_1 = __values(stretchy), stretchy_1_1 = stretchy_1.next(); !stretchy_1_1.done; stretchy_1_1 = stretchy_1.next()) {
                            var child = stretchy_1_1.value;
                            child.coreMO().getStretchedVariant(HD);
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