function CommonMsqrtMixin(Base) {
        return (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var _this = _super.apply(this, __spreadArray([], __read(args), false)) || this;
                var surd = _this.createMo('\u221A');
                surd.canStretch(1);
                var _a = _this.childNodes[_this.base].getOuterBBox(), h = _a.h, d = _a.d;
                var t = _this.font.params.rule_thickness;
                var p = (_this.node.attributes.get('displaystyle') ? _this.font.params.x_height : t);
                _this.surdH = h + d + 2 * t + p / 4;
                surd.getStretchedVariant([_this.surdH - d, d], true);
                return _this;
            }
            Object.defineProperty(class_1.prototype, "base", {
                get: function () {
                    return 0;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(class_1.prototype, "surd", {
                get: function () {
                    return 1;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(class_1.prototype, "root", {
                get: function () {
                    return null;
                },
                enumerable: false,
                configurable: true
            });
            class_1.prototype.createMo = function (text) {
                var node = _super.prototype.createMo.call(this, text);
                this.childNodes.push(node);
                return node;
            };
            class_1.prototype.computeBBox = function (bbox, recompute) {
                if (recompute === void 0) {
                    recompute = false;
                }
                var surdbox = this.childNodes[this.surd].getBBox();
                var basebox = new BBox_js_1.BBox(this.childNodes[this.base].getOuterBBox());
                var q = this.getPQ(surdbox)[1];
                var t = this.font.params.rule_thickness;
                var H = basebox.h + q + t;
                var _a = __read(this.getRootDimens(surdbox, H), 1), x = _a[0];
                bbox.h = H + t;
                this.combineRootBBox(bbox, surdbox, H);
                bbox.combine(surdbox, x, H - surdbox.h);
                bbox.combine(basebox, x + surdbox.w, 0);
                bbox.clean();
                this.setChildPWidths(recompute);
            };
            class_1.prototype.combineRootBBox = function (_bbox, _sbox, _H) {
            };
            class_1.prototype.getPQ = function (sbox) {
                var t = this.font.params.rule_thickness;
                var p = (this.node.attributes.get('displaystyle') ? this.font.params.x_height : t);
                var q = (sbox.h + sbox.d > this.surdH ?
                    ((sbox.h + sbox.d) - (this.surdH - 2 * t - p / 2)) / 2 :
                    t + p / 4);
                return [p, q];
            };
            class_1.prototype.getRootDimens = function (_sbox, _H) {
                return [0, 0, 0, 0];
            };
            return class_1;
        }(Base));
    }