function CommonMoverMixin(Base) {
        return (function (_super) {
            __extends(class_2, _super);
            function class_2() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var _this = _super.apply(this, __spreadArray([], __read(args), false)) || this;
                _this.stretchChildren();
                return _this;
            }
            Object.defineProperty(class_2.prototype, "scriptChild", {
                get: function () {
                    return this.childNodes[this.node.over];
                },
                enumerable: false,
                configurable: true
            });
            class_2.prototype.computeBBox = function (bbox) {
                if (this.hasMovableLimits()) {
                    _super.prototype.computeBBox.call(this, bbox);
                    return;
                }
                bbox.empty();
                var basebox = this.baseChild.getOuterBBox();
                var overbox = this.scriptChild.getOuterBBox();
                if (this.node.attributes.get('accent')) {
                    basebox.h = Math.max(basebox.h, this.font.params.x_height * basebox.scale);
                }
                var u = this.getOverKU(basebox, overbox)[1];
                var delta = (this.isLineAbove ? 0 : this.getDelta());
                var _a = __read(this.getDeltaW([basebox, overbox], [0, delta]), 2), bw = _a[0], ow = _a[1];
                bbox.combine(basebox, bw, 0);
                bbox.combine(overbox, ow, u);
                bbox.h += this.font.params.big_op_spacing5;
                bbox.clean();
            };
            return class_2;
        }(Base));
    }