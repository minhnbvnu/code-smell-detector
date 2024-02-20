function AbstractOutputJax(options) {
            if (options === void 0) {
                options = {};
            }
            this.adaptor = null;
            var CLASS = this.constructor;
            this.options = (0, Options_js_1.userOptions)((0, Options_js_1.defaultOptions)({}, CLASS.OPTIONS), options);
            this.postFilters = new FunctionList_js_1.FunctionList();
        }