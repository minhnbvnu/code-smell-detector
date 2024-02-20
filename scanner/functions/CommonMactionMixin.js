function CommonMactionMixin(Base) {
        return (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var _this = _super.apply(this, __spreadArray([], __read(args), false)) || this;
                var actions = _this.constructor.actions;
                var action = _this.node.attributes.get('actiontype');
                var _a = __read(actions.get(action) || [(function (_node, _data) { }), {}], 2), handler = _a[0], data = _a[1];
                _this.action = handler;
                _this.data = data;
                _this.getParameters();
                return _this;
            }
            Object.defineProperty(class_1.prototype, "selected", {
                get: function () {
                    var selection = this.node.attributes.get('selection');
                    var i = Math.max(1, Math.min(this.childNodes.length, selection)) - 1;
                    return this.childNodes[i] || this.wrap(this.node.selected);
                },
                enumerable: false,
                configurable: true
            });
            class_1.prototype.getParameters = function () {
                var offsets = this.node.attributes.get('data-offsets');
                var _a = __read((0, string_js_1.split)(offsets || ''), 2), dx = _a[0], dy = _a[1];
                this.dx = this.length2em(dx || exports.TooltipData.dx);
                this.dy = this.length2em(dy || exports.TooltipData.dy);
            };
            class_1.prototype.computeBBox = function (bbox, recompute) {
                if (recompute === void 0) {
                    recompute = false;
                }
                bbox.updateFrom(this.selected.getOuterBBox());
                this.selected.setChildPWidths(recompute);
            };
            return class_1;
        }(Base));
    }