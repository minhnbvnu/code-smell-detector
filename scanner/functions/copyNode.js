function copyNode(node, parser) {
            var tree = node.copy();
            var options = parser.configuration;
            tree.walkTree(function (n) {
                var e_1, _a;
                options.addNode(n.kind, n);
                var lists = (n.getProperty('in-lists') || '').split(/,/);
                try {
                    for (var lists_1 = __values(lists), lists_1_1 = lists_1.next(); !lists_1_1.done; lists_1_1 = lists_1.next()) {
                        var list = lists_1_1.value;
                        list && options.addNode(list, n);
                    }
                }
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (lists_1_1 && !lists_1_1.done && (_a = lists_1.return))
                            _a.call(lists_1);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
                }
            });
            return tree;
        }