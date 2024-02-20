function findAncestor(node, callback) {
            while (node) {
                const result = callback(node);
                if (result === "quit") {
                    return void 0;
                }
                else if (result) {
                    return node;
                }
                node = node.parent;
            }
            return void 0;
        }