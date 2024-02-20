function CommonMsubMixin(Base) {
        var _a;
        return _a = (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(class_1.prototype, "scriptChild", {
                get: function () {
                    return this.childNodes[this.node.sub];
                },
                enumerable: false,
                configurable: true
            });
            class_1.prototype.getOffset = function () {
                return [0, -this.getV()];
            };
            return class_1;
        }(Base)),
            _a.useIC = false,
            _a;
    }