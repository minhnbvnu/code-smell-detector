function appendChildren(node, children) {
            var e_1, _a;
            try {
                for (var children_1 = __values(children), children_1_1 = children_1.next(); !children_1_1.done; children_1_1 = children_1.next()) {
                    var child = children_1_1.value;
                    node.appendChild(child);
                }
            }
            catch (e_1_1) {
                e_1 = { error: e_1_1 };
            }
            finally {
                try {
                    if (children_1_1 && !children_1_1.done && (_a = children_1.return))
                        _a.call(children_1);
                }
                finally {
                    if (e_1)
                        throw e_1.error;
                }
            }
        }