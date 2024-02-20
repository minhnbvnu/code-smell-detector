function CommonMrowMixin(Base) {
        return (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var e_1, _a;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var _this = _super.apply(this, __spreadArray([], __read(args), false)) || this;
                _this.stretchChildren();
                try {
                    for (var _b = __values(_this.childNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var child = _c.value;
                        if (child.bbox.pwidth) {
                            _this.bbox.pwidth = BBox_js_1.BBox.fullWidth;
                            break;
                        }
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
                return _this;
            }
            Object.defineProperty(class_1.prototype, "fixesPWidth", {
                get: function () {
                    return false;
                },
                enumerable: false,
                configurable: true
            });
            class_1.prototype.stretchChildren = function () {
                var e_2, _a, e_3, _b, e_4, _c;
                var stretchy = [];
                try {
                    for (var _d = __values(this.childNodes), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var child = _e.value;
                        if (child.canStretch(1)) {
                            stretchy.push(child);
                        }
                    }
                }
                catch (e_2_1) {
                    e_2 = { error: e_2_1 };
                }
                finally {
                    try {
                        if (_e && !_e.done && (_a = _d.return))
                            _a.call(_d);
                    }
                    finally {
                        if (e_2)
                            throw e_2.error;
                    }
                }
                var count = stretchy.length;
                var nodeCount = this.childNodes.length;
                if (count && nodeCount > 1) {
                    var H = 0, D = 0;
                    var all = (count > 1 && count === nodeCount);
                    try {
                        for (var _f = __values(this.childNodes), _g = _f.next(); !_g.done; _g = _f.next()) {
                            var child = _g.value;
                            var noStretch = (child.stretch.dir === 0);
                            if (all || noStretch) {
                                var _h = child.getOuterBBox(noStretch), h = _h.h, d = _h.d, rscale = _h.rscale;
                                h *= rscale;
                                d *= rscale;
                                if (h > H)
                                    H = h;
                                if (d > D)
                                    D = d;
                            }
                        }
                    }
                    catch (e_3_1) {
                        e_3 = { error: e_3_1 };
                    }
                    finally {
                        try {
                            if (_g && !_g.done && (_b = _f.return))
                                _b.call(_f);
                        }
                        finally {
                            if (e_3)
                                throw e_3.error;
                        }
                    }
                    try {
                        for (var stretchy_1 = __values(stretchy), stretchy_1_1 = stretchy_1.next(); !stretchy_1_1.done; stretchy_1_1 = stretchy_1.next()) {
                            var child = stretchy_1_1.value;
                            child.coreMO().getStretchedVariant([H, D]);
                        }
                    }
                    catch (e_4_1) {
                        e_4 = { error: e_4_1 };
                    }
                    finally {
                        try {
                            if (stretchy_1_1 && !stretchy_1_1.done && (_c = stretchy_1.return))
                                _c.call(stretchy_1);
                        }
                        finally {
                            if (e_4)
                                throw e_4.error;
                        }
                    }
                }
            };
            return class_1;
        }(Base));
    }