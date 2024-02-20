function CommonSemanticsMixin(Base) {
        return (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            class_1.prototype.computeBBox = function (bbox, _recompute) {
                if (_recompute === void 0) {
                    _recompute = false;
                }
                if (this.childNodes.length) {
                    var _a = this.childNodes[0].getBBox(), w = _a.w, h = _a.h, d = _a.d;
                    bbox.w = w;
                    bbox.h = h;
                    bbox.d = d;
                }
            };
            return class_1;
        }(Base));
    }