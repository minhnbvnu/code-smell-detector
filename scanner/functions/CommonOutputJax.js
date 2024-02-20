function CommonOutputJax(options, defaultFactory, defaultFont) {
            if (options === void 0) {
                options = null;
            }
            if (defaultFactory === void 0) {
                defaultFactory = null;
            }
            if (defaultFont === void 0) {
                defaultFont = null;
            }
            var _this = this;
            var _a = __read((0, Options_js_1.separateOptions)(options, defaultFont.OPTIONS), 2), jaxOptions = _a[0], fontOptions = _a[1];
            _this = _super.call(this, jaxOptions) || this;
            _this.factory = _this.options.wrapperFactory ||
                new defaultFactory();
            _this.factory.jax = _this;
            _this.cssStyles = _this.options.cssStyles || new StyleList_js_1.CssStyles();
            _this.font = _this.options.font || new defaultFont(fontOptions);
            _this.unknownCache = new Map();
            return _this;
        }