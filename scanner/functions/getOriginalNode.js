function getOriginalNode(node, nodeTest) {
            if (node) {
                while (node.original !== void 0) {
                    node = node.original;
                }
            }
            if (!node || !nodeTest) {
                return node;
            }
            return nodeTest(node) ? node : void 0;
        }