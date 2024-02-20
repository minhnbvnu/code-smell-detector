function ParserConfiguration(packages, parsers) {
            var e_1, _a, e_2, _b;
            if (parsers === void 0) {
                parsers = ['tex'];
            }
            this.initMethod = new FunctionList_js_1.FunctionList();
            this.configMethod = new FunctionList_js_1.FunctionList();
            this.configurations = new PrioritizedList_js_1.PrioritizedList();
            this.parsers = [];
            this.handlers = new MapHandler_js_1.SubHandlers();
            this.items = {};
            this.tags = {};
            this.options = {};
            this.nodes = {};
            this.parsers = parsers;
            try {
                for (var _c = __values(packages.slice().reverse()), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var pkg = _d.value;
                    this.addPackage(pkg);
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
            try {
                for (var _e = __values(this.configurations), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var _g = _f.value, config = _g.item, priority = _g.priority;
                    this.append(config, priority);
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
        }