function AbstractFactory(nodes) {
            var e_1, _a;
            if (nodes === void 0) {
                nodes = null;
            }
            this.defaultKind = 'unknown';
            this.nodeMap = new Map();
            this.node = {};
            if (nodes === null) {
                nodes = this.constructor.defaultNodes;
            }
            try {
                for (var _b = __values(Object.keys(nodes)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var kind = _c.value;
                    this.setNodeClass(kind, nodes[kind]);
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
        }