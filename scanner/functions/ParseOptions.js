function ParseOptions(configuration, options) {
            if (options === void 0) {
                options = [];
            }
            this.options = {};
            this.packageData = new Map();
            this.parsers = [];
            this.root = null;
            this.nodeLists = {};
            this.error = false;
            this.handlers = configuration.handlers;
            this.nodeFactory = new NodeFactory_js_1.NodeFactory();
            this.nodeFactory.configuration = this;
            this.nodeFactory.setCreators(configuration.nodes);
            this.itemFactory = new StackItemFactory_js_1.default(configuration.items);
            this.itemFactory.configuration = this;
            Options_js_1.defaultOptions.apply(void 0, __spreadArray([this.options], __read(options), false));
            (0, Options_js_1.defaultOptions)(this.options, configuration.options);
        }