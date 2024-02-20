function CommonMspaceMixin(Base) {
        return (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            class_1.prototype.computeBBox = function (bbox, _recompute) {
                if (_recompute === void 0) {
                    _recompute = false;
                }
                var attributes = this.node.attributes;
                bbox.w = this.length2em(attributes.get('width'), 0);
                bbox.h = this.length2em(attributes.get('height'), 0);
                bbox.d = this.length2em(attributes.get('depth'), 0);
            };
            class_1.prototype.handleVariant = function () {
            };
            return class_1;
        }(Base));
    }