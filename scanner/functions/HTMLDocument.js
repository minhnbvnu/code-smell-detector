function HTMLDocument(document, adaptor, options) {
            var _this = this;
            var _a = __read((0, Options_js_1.separateOptions)(options, HTMLDomStrings_js_1.HTMLDomStrings.OPTIONS), 2), html = _a[0], dom = _a[1];
            _this = _super.call(this, document, adaptor, html) || this;
            _this.domStrings = _this.options['DomStrings'] || new HTMLDomStrings_js_1.HTMLDomStrings(dom);
            _this.domStrings.adaptor = adaptor;
            _this.styles = [];
            return _this;
        }