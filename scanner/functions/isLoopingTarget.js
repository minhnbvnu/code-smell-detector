function isLoopingTarget(node) {
        const parent = node.parent;
        if (parent) {
            switch (parent.type) {
                case "WhileStatement":
                    return node === parent.test;
                case "DoWhileStatement":
                    return node === parent.body;
                case "ForStatement":
                    return node === (parent.update || parent.test || parent.body);
                case "ForInStatement":
                case "ForOfStatement":
                    return node === parent.left;
                // no default
            }
        }
        return false;
    }