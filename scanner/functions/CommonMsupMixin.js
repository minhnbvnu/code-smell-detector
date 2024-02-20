function CommonMsupMixin(Base) {
        return (function (_super) {
            __extends(class_2, _super);
            function class_2() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(class_2.prototype, "scriptChild", {
                get: function () {
                    return this.childNodes[this.node.sup];
                },
                enumerable: false,
                configurable: true
            });
            class_2.prototype.getOffset = function () {
                var x = this.getAdjustedIc() - (this.baseRemoveIc ? 0 : this.baseIc);
                return [x, this.getU()];
            };
            return class_2;
        }(Base));
    }