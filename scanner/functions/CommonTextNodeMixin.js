function CommonTextNodeMixin(Base) {
        return (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            class_1.prototype.computeBBox = function (bbox, _recompute) {
                var e_1, _a;
                if (_recompute === void 0) {
                    _recompute = false;
                }
                var variant = this.parent.variant;
                var text = this.node.getText();
                if (variant === '-explicitFont') {
                    var font = this.jax.getFontData(this.parent.styles);
                    var _b = this.jax.measureText(text, variant, font), w = _b.w, h = _b.h, d = _b.d;
                    bbox.h = h;
                    bbox.d = d;
                    bbox.w = w;
                }
                else {
                    var chars = this.remappedText(text, variant);
                    bbox.empty();
                    try {
                        for (var chars_1 = __values(chars), chars_1_1 = chars_1.next(); !chars_1_1.done; chars_1_1 = chars_1.next()) {
                            var char = chars_1_1.value;
                            var _c = __read(this.getVariantChar(variant, char), 4), h = _c[0], d = _c[1], w = _c[2], data = _c[3];
                            if (data.unknown) {
                                var cbox = this.jax.measureText(String.fromCodePoint(char), variant);
                                w = cbox.w;
                                h = cbox.h;
                                d = cbox.d;
                            }
                            bbox.w += w;
                            if (h > bbox.h)
                                bbox.h = h;
                            if (d > bbox.d)
                                bbox.d = d;
                            bbox.ic = data.ic || 0;
                            bbox.sk = data.sk || 0;
                            bbox.dx = data.dx || 0;
                        }
                    }
                    catch (e_1_1) {
                        e_1 = { error: e_1_1 };
                    }
                    finally {
                        try {
                            if (chars_1_1 && !chars_1_1.done && (_a = chars_1.return))
                                _a.call(chars_1);
                        }
                        finally {
                            if (e_1)
                                throw e_1.error;
                        }
                    }
                    if (chars.length > 1) {
                        bbox.sk = 0;
                    }
                    bbox.clean();
                }
            };
            class_1.prototype.remappedText = function (text, variant) {
                var c = this.parent.stretch.c;
                return (c ? [c] : this.parent.remapChars(this.unicodeChars(text, variant)));
            };
            class_1.prototype.getStyles = function () { };
            class_1.prototype.getVariant = function () { };
            class_1.prototype.getScale = function () { };
            class_1.prototype.getSpace = function () { };
            return class_1;
        }(Base));
    }