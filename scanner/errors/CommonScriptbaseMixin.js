            class_1.prototype.stretchChildren = function () {
                var e_4, _a, e_5, _b, e_6, _c;
                var stretchy = [];
                try {
                    for (var _d = __values(this.childNodes), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var child = _e.value;
                        if (child.canStretch(2)) {
                            stretchy.push(child);
                        }
                    }
                }
                catch (e_4_1) {
                    e_4 = { error: e_4_1 };
                }
                finally {
                    try {
                        if (_e && !_e.done && (_a = _d.return))
                            _a.call(_d);
                    }
                    finally {
                        if (e_4)
                            throw e_4.error;
                    }
                }
                var count = stretchy.length;
                var nodeCount = this.childNodes.length;
                if (count && nodeCount > 1) {
                    var W = 0;
                    var all = (count > 1 && count === nodeCount);
                    try {
                        for (var _f = __values(this.childNodes), _g = _f.next(); !_g.done; _g = _f.next()) {
                            var child = _g.value;
                            var noStretch = (child.stretch.dir === 0);
                            if (all || noStretch) {
                                var _h = child.getOuterBBox(noStretch), w = _h.w, rscale = _h.rscale;
                                if (w * rscale > W)
                                    W = w * rscale;
                            }
                        }
                    }
                    catch (e_5_1) {
                        e_5 = { error: e_5_1 };
                    }
                    finally {
                        try {
                            if (_g && !_g.done && (_b = _f.return))
                                _b.call(_f);
                        }
                        finally {
                            if (e_5)
                                throw e_5.error;
                        }
                    }
                    try {
                        for (var stretchy_1 = __values(stretchy), stretchy_1_1 = stretchy_1.next(); !stretchy_1_1.done; stretchy_1_1 = stretchy_1.next()) {
                            var child = stretchy_1_1.value;
                            child.coreMO().getStretchedVariant([W / child.bbox.rscale]);
                        }
                    }
                    catch (e_6_1) {
                        e_6 = { error: e_6_1 };
                    }
                    finally {
                        try {
                            if (stretchy_1_1 && !stretchy_1_1.done && (_c = stretchy_1.return))
                                _c.call(stretchy_1);
                        }
                        finally {
                            if (e_6)
                                throw e_6.error;
                        }
                    }
                }
            };