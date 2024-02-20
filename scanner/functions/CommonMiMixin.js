function CommonMiMixin(Base) {
        return (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            class_1.prototype.computeBBox = function (bbox, _recompute) {
                if (_recompute === void 0) {
                    _recompute = false;
                }
                _super.prototype.computeBBox.call(this, bbox);
                this.copySkewIC(bbox);
            };
            return class_1;
        }(Base));
    }