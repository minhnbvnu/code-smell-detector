function TeX(options) {
            if (options === void 0) {
                options = {};
            }
            var _this = this;
            var _a = __read((0, Options_js_1.separateOptions)(options, TeX.OPTIONS, FindTeX_js_1.FindTeX.OPTIONS), 3), rest = _a[0], tex = _a[1], find = _a[2];
            _this = _super.call(this, tex) || this;
            _this.findTeX = _this.options['FindTeX'] || new FindTeX_js_1.FindTeX(find);
            var packages = _this.options.packages;
            var configuration = _this.configuration = TeX.configure(packages);
            var parseOptions = _this._parseOptions =
                new ParseOptions_js_1.default(configuration, [_this.options, Tags_js_1.TagsFactory.OPTIONS]);
            (0, Options_js_1.userOptions)(parseOptions.options, rest);
            configuration.config(_this);
            TeX.tags(parseOptions, configuration);
            _this.postFilters.add(FilterUtil_js_1.default.cleanSubSup, -6);
            _this.postFilters.add(FilterUtil_js_1.default.setInherited, -5);
            _this.postFilters.add(FilterUtil_js_1.default.moveLimits, -4);
            _this.postFilters.add(FilterUtil_js_1.default.cleanStretchy, -3);
            _this.postFilters.add(FilterUtil_js_1.default.cleanAttributes, -2);
            _this.postFilters.add(FilterUtil_js_1.default.combineRelations, -1);
            return _this;
        }