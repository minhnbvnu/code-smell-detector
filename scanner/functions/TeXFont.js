function TeXFont(options) {
            var e_1, _a;
            if (options === void 0) {
                options = null;
            }
            var _this = _super.call(this, options) || this;
            var CLASS = _this.constructor;
            try {
                for (var _b = __values(Object.keys(CLASS.variantCacheIds)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var variant = _c.value;
                    _this.variant[variant].cacheID = 'TEX-' + CLASS.variantCacheIds[variant];
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