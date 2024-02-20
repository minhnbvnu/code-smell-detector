function CommonInferredMrowMixin(Base) {
        return (function (_super) {
            __extends(class_2, _super);
            function class_2() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            class_2.prototype.getScale = function () {
                this.bbox.scale = this.parent.bbox.scale;
                this.bbox.rscale = 1;
            };
            return class_2;
        }(Base));
    }