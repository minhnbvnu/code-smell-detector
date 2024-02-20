function CommonMfencedMixin(Base) {
        return (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var _this = _super.apply(this, __spreadArray([], __read(args), false)) || this;
                _this.mrow = null;
                _this.createMrow();
                _this.addMrowChildren();
                return _this;
            }
            class_1.prototype.createMrow = function () {
                var mmlFactory = this.node.factory;
                var mrow = mmlFactory.create('inferredMrow');
                mrow.inheritAttributesFrom(this.node);
                this.mrow = this.wrap(mrow);
                this.mrow.parent = this;
            };
            class_1.prototype.addMrowChildren = function () {
                var e_1, _a;
                var mfenced = this.node;
                var mrow = this.mrow;
                this.addMo(mfenced.open);
                if (this.childNodes.length) {
                    mrow.childNodes.push(this.childNodes[0]);
                }
                var i = 0;
                try {
                    for (var _b = __values(this.childNodes.slice(1)), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var child = _c.value;
                        this.addMo(mfenced.separators[i++]);
                        mrow.childNodes.push(child);
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
                this.addMo(mfenced.close);
                mrow.stretchChildren();
            };
            class_1.prototype.addMo = function (node) {
                if (!node)
                    return;
                var mo = this.wrap(node);
                this.mrow.childNodes.push(mo);
                mo.parent = this.mrow;
            };
            class_1.prototype.computeBBox = function (bbox, recompute) {
                if (recompute === void 0) {
                    recompute = false;
                }
                bbox.updateFrom(this.mrow.getOuterBBox());
                this.setChildPWidths(recompute);
            };
            return class_1;
        }(Base));
    }