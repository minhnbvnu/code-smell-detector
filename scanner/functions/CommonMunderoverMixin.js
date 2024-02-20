function CommonMunderoverMixin(Base) {
        return (function (_super) {
            __extends(class_3, _super);
            function class_3() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var _this = _super.apply(this, __spreadArray([], __read(args), false)) || this;
                _this.stretchChildren();
                return _this;
            }
            Object.defineProperty(class_3.prototype, "underChild", {
                get: function () {
                    return this.childNodes[this.node.under];
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(class_3.prototype, "overChild", {
                get: function () {
                    return this.childNodes[this.node.over];
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(class_3.prototype, "subChild", {
                get: function () {
                    return this.underChild;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(class_3.prototype, "supChild", {
                get: function () {
                    return this.overChild;
                },
                enumerable: false,
                configurable: true
            });
            class_3.prototype.computeBBox = function (bbox) {
                if (this.hasMovableLimits()) {
                    _super.prototype.computeBBox.call(this, bbox);
                    return;
                }
                bbox.empty();
                var overbox = this.overChild.getOuterBBox();
                var basebox = this.baseChild.getOuterBBox();
                var underbox = this.underChild.getOuterBBox();
                if (this.node.attributes.get('accent')) {
                    basebox.h = Math.max(basebox.h, this.font.params.x_height * basebox.scale);
                }
                var u = this.getOverKU(basebox, overbox)[1];
                var v = this.getUnderKV(basebox, underbox)[1];
                var delta = this.getDelta();
                var _a = __read(this.getDeltaW([basebox, underbox, overbox], [0, this.isLineBelow ? 0 : -delta, this.isLineAbove ? 0 : delta]), 3), bw = _a[0], uw = _a[1], ow = _a[2];
                bbox.combine(basebox, bw, 0);
                bbox.combine(overbox, ow, u);
                bbox.combine(underbox, uw, v);
                var z = this.font.params.big_op_spacing5;
                bbox.h += z;
                bbox.d += z;
                bbox.clean();
            };
            return class_3;
        }(Base));
    }