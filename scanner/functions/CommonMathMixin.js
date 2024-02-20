function CommonMathMixin(Base) {
        return (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            class_1.prototype.getWrapWidth = function (_i) {
                return (this.parent ? this.getBBox().w : this.metrics.containerWidth / this.jax.pxPerEm);
            };
            return class_1;
        }(Base));
    }