function Configuration(name, handler, fallback, items, tags, options, nodes, preprocessors, postprocessors, initMethod, configMethod, priority, parser) {
            if (handler === void 0) {
                handler = {};
            }
            if (fallback === void 0) {
                fallback = {};
            }
            if (items === void 0) {
                items = {};
            }
            if (tags === void 0) {
                tags = {};
            }
            if (options === void 0) {
                options = {};
            }
            if (nodes === void 0) {
                nodes = {};
            }
            if (preprocessors === void 0) {
                preprocessors = [];
            }
            if (postprocessors === void 0) {
                postprocessors = [];
            }
            if (initMethod === void 0) {
                initMethod = null;
            }
            if (configMethod === void 0) {
                configMethod = null;
            }
            this.name = name;
            this.handler = handler;
            this.fallback = fallback;
            this.items = items;
            this.tags = tags;
            this.options = options;
            this.nodes = nodes;
            this.preprocessors = preprocessors;
            this.postprocessors = postprocessors;
            this.initMethod = initMethod;
            this.configMethod = configMethod;
            this.priority = priority;
            this.parser = parser;
            this.handler = Object.assign({ character: [], delimiter: [], macro: [], environment: [] }, handler);
        }