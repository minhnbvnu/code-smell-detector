function HTMLDomStrings(options) {
            if (options === void 0) {
                options = null;
            }
            var CLASS = this.constructor;
            this.options = (0, Options_js_1.userOptions)((0, Options_js_1.defaultOptions)({}, CLASS.OPTIONS), options);
            this.init();
            this.getPatterns();
        }