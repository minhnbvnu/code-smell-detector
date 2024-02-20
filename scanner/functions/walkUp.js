function walkUp(node, kind) {
            while (node && node.kind === kind) {
                node = node.parent;
            }
            return node;
        }