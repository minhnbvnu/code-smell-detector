function getAncestor(node, kind) {
            while (node) {
                if (node.kind === kind) {
                    return node;
                }
                node = node.parent;
            }
            return void 0;
        }