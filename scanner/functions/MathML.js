function MathML(options) {
            if (options === void 0) {
                options = {};
            }
            var _this = this;
            var _a = __read((0, Options_js_1.separateOptions)(options, FindMathML_js_1.FindMathML.OPTIONS, MathMLCompile_js_1.MathMLCompile.OPTIONS), 3), mml = _a[0], find = _a[1], compile = _a[2];
            _this = _super.call(this, mml) || this;
            _this.findMathML = _this.options['FindMathML'] || new FindMathML_js_1.FindMathML(find);
            _this.mathml = _this.options['MathMLCompile'] || new MathMLCompile_js_1.MathMLCompile(compile);
            _this.mmlFilters = new FunctionList_js_1.FunctionList();
            return _this;
        }