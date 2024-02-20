function isLooped(node, parent) {
        switch (parent.type) {
            case "ForStatement":
                return (node === parent.test ||
                    node === parent.update ||
                    node === parent.body);
            case "ForOfStatement":
            case "ForInStatement":
                return node === parent.body;
            case "WhileStatement":
            case "DoWhileStatement":
                return node === parent.test || node === parent.body;
            default:
                return false;
        }
    }