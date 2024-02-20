function hasUnsafeIf(node) {
                switch (node.type) {
                    case "IfStatement":
                        if (!node.alternate) {
                            return true;
                        }
                        return hasUnsafeIf(node.alternate);
                    case "ForStatement":
                    case "ForInStatement":
                    case "ForOfStatement":
                    case "LabeledStatement":
                    case "WithStatement":
                    case "WhileStatement":
                        return hasUnsafeIf(node.body);
                    default:
                        return false;
                }
            }