function MathMLCompile(options) {
            if (options === void 0) {
                options = {};
            }
            var Class = this.constructor;
            this.options = (0, Options_js_1.userOptions)((0, Options_js_1.defaultOptions)({}, Class.OPTIONS), options);
        }