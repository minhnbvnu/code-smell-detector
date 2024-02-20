function CommonMsMixin(Base) {
        return (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var _this = _super.apply(this, __spreadArray([], __read(args), false)) || this;
                var attributes = _this.node.attributes;
                var quotes = attributes.getList('lquote', 'rquote');
                if (_this.variant !== 'monospace') {
                    if (!attributes.isSet('lquote') && quotes.lquote === '"')
                        quotes.lquote = '\u201C';
                    if (!attributes.isSet('rquote') && quotes.rquote === '"')
                        quotes.rquote = '\u201D';
                }
                _this.childNodes.unshift(_this.createText(quotes.lquote));
                _this.childNodes.push(_this.createText(quotes.rquote));
                return _this;
            }
            class_1.prototype.createText = function (text) {
                var node = this.wrap(this.mmlText(text));
                node.parent = this;
                return node;
            };
            return class_1;
        }(Base));
    }