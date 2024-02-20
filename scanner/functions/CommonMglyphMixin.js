function CommonMglyphMixin(Base) {
        return (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var _this = _super.apply(this, __spreadArray([], __read(args), false)) || this;
                _this.getParameters();
                return _this;
            }
            class_1.prototype.getParameters = function () {
                var _a = this.node.attributes.getList('width', 'height', 'valign', 'src', 'index'), width = _a.width, height = _a.height, valign = _a.valign, src = _a.src, index = _a.index;
                if (src) {
                    this.width = (width === 'auto' ? 1 : this.length2em(width));
                    this.height = (height === 'auto' ? 1 : this.length2em(height));
                    this.valign = this.length2em(valign || '0');
                }
                else {
                    var text = String.fromCodePoint(parseInt(index));
                    var mmlFactory = this.node.factory;
                    this.charWrapper = this.wrap(mmlFactory.create('text').setText(text));
                    this.charWrapper.parent = this;
                }
            };
            class_1.prototype.computeBBox = function (bbox, _recompute) {
                if (_recompute === void 0) {
                    _recompute = false;
                }
                if (this.charWrapper) {
                    bbox.updateFrom(this.charWrapper.getBBox());
                }
                else {
                    bbox.w = this.width;
                    bbox.h = this.height + this.valign;
                    bbox.d = -this.valign;
                }
            };
            return class_1;
        }(Base));
    }