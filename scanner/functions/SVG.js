function SVG(options) {
            if (options === void 0) {
                options = null;
            }
            var _this = _super.call(this, options, WrapperFactory_js_1.SVGWrapperFactory, tex_js_1.TeXFont) || this;
            _this.minwidth = 0;
            _this.shift = 0;
            _this.container = null;
            _this.svgStyles = null;
            _this.fontCache = new FontCache_js_1.FontCache(_this);
            return _this;
        }