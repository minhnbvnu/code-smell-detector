function isInLoop(node) {
                let currentNode = node;
                while (currentNode) {
                    if (utils_1.ASTUtils.isFunction(currentNode)) {
                        break;
                    }
                    if (utils_1.ASTUtils.isLoop(currentNode)) {
                        return true;
                    }
                    currentNode = currentNode.parent;
                }
                return false;
            }