function AbstractNode(factory, properties, children) {
            var e_1, _a;
            if (properties === void 0) {
                properties = {};
            }
            if (children === void 0) {
                children = [];
            }
            this.factory = factory;
            this.parent = null;
            this.properties = {};
            this.childNodes = [];
            try {
                for (var _b = __values(Object.keys(properties)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var name_1 = _c.value;
                    this.setProperty(name_1, properties[name_1]);
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
            if (children.length) {
                this.setChildren(children);
            }
        }