function AbstractInputJax(options) {
            if (options === void 0) {
                options = {};
            }
            this.adaptor = null;
            this.mmlFactory = null;
            var CLASS = this.constructor;
            this.options = (0, Options_js_1.userOptions)((0, Options_js_1.defaultOptions)({}, CLASS.OPTIONS), options);
            this.preFilters = new FunctionList_js_1.FunctionList();
            this.postFilters = new FunctionList_js_1.FunctionList();
        }