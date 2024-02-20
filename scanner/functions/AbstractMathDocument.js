function AbstractMathDocument(document, adaptor, options) {
            var _this = this;
            var CLASS = this.constructor;
            this.document = document;
            this.options = (0, Options_js_1.userOptions)((0, Options_js_1.defaultOptions)({}, CLASS.OPTIONS), options);
            this.math = new (this.options['MathList'] || DefaultMathList)();
            this.renderActions = RenderList.create(this.options['renderActions']);
            this.processed = new AbstractMathDocument.ProcessBits();
            this.outputJax = this.options['OutputJax'] || new DefaultOutputJax();
            var inputJax = this.options['InputJax'] || [new DefaultInputJax()];
            if (!Array.isArray(inputJax)) {
                inputJax = [inputJax];
            }
            this.inputJax = inputJax;
            this.adaptor = adaptor;
            this.outputJax.setAdaptor(adaptor);
            this.inputJax.map(function (jax) { return jax.setAdaptor(adaptor); });
            this.mmlFactory = this.options['MmlFactory'] || new MmlFactory_js_1.MmlFactory();
            this.inputJax.map(function (jax) { return jax.setMmlFactory(_this.mmlFactory); });
            this.outputJax.initialize();
            this.inputJax.map(function (jax) { return jax.initialize(); });
        }