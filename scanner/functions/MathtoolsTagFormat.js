function MathtoolsTagFormat(config, jax) {
        var tags = jax.parseOptions.options.tags;
        if (tags !== 'base' && config.tags.hasOwnProperty(tags)) {
            Tags_js_1.TagsFactory.add(tags, config.tags[tags]);
        }
        var TagClass = Tags_js_1.TagsFactory.create(jax.parseOptions.options.tags).constructor;
        var TagFormat = (function (_super) {
            __extends(TagFormat, _super);
            function TagFormat() {
                var e_1, _a;
                var _this = _super.call(this) || this;
                _this.mtFormats = new Map();
                _this.mtCurrent = null;
                var forms = jax.parseOptions.options.mathtools.tagforms;
                try {
                    for (var _b = __values(Object.keys(forms)), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var form = _c.value;
                        if (!Array.isArray(forms[form]) || forms[form].length !== 3) {
                            throw new TexError_js_1.default('InvalidTagFormDef', 'The tag form definition for "%1" should be an array fo three strings', form);
                        }
                        _this.mtFormats.set(form, forms[form]);
                    }
                }
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return))
                            _a.call(_b);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
                }
                return _this;
            }
            TagFormat.prototype.formatTag = function (tag) {
                if (this.mtCurrent) {
                    var _a = __read(this.mtCurrent, 3), left = _a[0], right = _a[1], format = _a[2];
                    return (format ? "".concat(left).concat(format, "{").concat(tag, "}").concat(right) : "".concat(left).concat(tag).concat(right));
                }
                return _super.prototype.formatTag.call(this, tag);
            };
            return TagFormat;
        }(TagClass));
        tagID++;
        var tagName = 'MathtoolsTags-' + tagID;
        Tags_js_1.TagsFactory.add(tagName, TagFormat);
        jax.parseOptions.options.tags = tagName;
    }