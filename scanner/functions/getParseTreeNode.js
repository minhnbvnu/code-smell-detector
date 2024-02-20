function getParseTreeNode(node, nodeTest) {
            if (node === void 0 || isParseTreeNode(node)) {
                return node;
            }
            node = node.original;
            while (node) {
                if (isParseTreeNode(node)) {
                    return !nodeTest || nodeTest(node) ? node : void 0;
                }
                node = node.original;
            }
        }