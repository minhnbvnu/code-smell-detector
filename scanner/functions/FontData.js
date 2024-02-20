function FontData(options) {
            var e_1, _a, e_2, _b;
            if (options === void 0) {
                options = null;
            }
            this.variant = {};
            this.delimiters = {};
            this.cssFontMap = {};
            this.remapChars = {};
            this.skewIcFactor = .75;
            var CLASS = this.constructor;
            this.options = (0, Options_js_1.userOptions)((0, Options_js_1.defaultOptions)({}, CLASS.OPTIONS), options);
            this.params = __assign({}, CLASS.defaultParams);
            this.sizeVariants = __spreadArray([], __read(CLASS.defaultSizeVariants), false);
            this.stretchVariants = __spreadArray([], __read(CLASS.defaultStretchVariants), false);
            this.cssFontMap = __assign({}, CLASS.defaultCssFonts);
            try {
                for (var _c = __values(Object.keys(this.cssFontMap)), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var name_1 = _d.value;
                    if (this.cssFontMap[name_1][0] === 'unknown') {
                        this.cssFontMap[name_1][0] = this.options.unknownFamily;
                    }
                }
            }
            catch (e_1_1) {
                e_1 = { error: e_1_1 };
            }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return))
                        _a.call(_c);
                }
                finally {
                    if (e_1)
                        throw e_1.error;
                }
            }
            this.cssFamilyPrefix = CLASS.defaultCssFamilyPrefix;
            this.createVariants(CLASS.defaultVariants);
            this.defineDelimiters(CLASS.defaultDelimiters);
            try {
                for (var _e = __values(Object.keys(CLASS.defaultChars)), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var name_2 = _f.value;
                    this.defineChars(name_2, CLASS.defaultChars[name_2]);
                }
            }
            catch (e_2_1) {
                e_2 = { error: e_2_1 };
            }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return))
                        _b.call(_e);
                }
                finally {
                    if (e_2)
                        throw e_2.error;
                }
            }
            this.defineRemap('accent', CLASS.defaultAccentMap);
            this.defineRemap('mo', CLASS.defaultMoMap);
            this.defineRemap('mn', CLASS.defaultMnMap);
        }