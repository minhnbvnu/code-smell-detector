function CommonMunderMixin(Base) {
        return (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var _this = _super.apply(this, __spreadArray([], __read(args), false)) || this;
                _this.stretchChildren();
                return _this;
            }
            Object.defineProperty(class_1.prototype, "scriptChild", {
                get: function () {
                    return this.childNodes[this.node.under];
                },
                enumerable: false,
                configurable: true
            });
            class_1.prototype.computeBBox = function (bbox, recompute) {
                if (recompute === void 0) {
                    recompute = false;
                }
                if (this.hasMovableLimits()) {
                    _super.prototype.computeBBox.call(this, bbox, recompute);
                    return;
                }
                bbox.empty();
                var basebox = this.baseChild.getOuterBBox();
                var underbox = this.scriptChild.getOuterBBox();
                var v = this.getUnderKV(basebox, underbox)[1];
                var delta = (this.isLineBelow ? 0 : this.getDelta(true));
                var _a = __read(this.getDeltaW([basebox, underbox], [0, -delta]), 2), bw = _a[0], uw = _a[1];
                bbox.combine(basebox, bw, 0);
                bbox.combine(underbox, uw, v);
                bbox.d += this.font.params.big_op_spacing5;
                bbox.clean();
                this.setChildPWidths(recompute);
            };
            return class_1;
        }(Base));
    }