function CommonMnMixin(Base) {
        return (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            class_1.prototype.remapChars = function (chars) {
                if (chars.length) {
                    var text = this.font.getRemappedChar('mn', chars[0]);
                    if (text) {
                        var c = this.unicodeChars(text, this.variant);
                        if (c.length === 1) {
                            chars[0] = c[0];
                        }
                        else {
                            chars = c.concat(chars.slice(1));
                        }
                    }
                }
                return chars;
            };
            return class_1;
        }(Base));
    }