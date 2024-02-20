function getUpperFunction(node) {
                    let currentNode = node;
                    while (currentNode) {
                        if (utils_1.ASTUtils.isFunction(currentNode)) {
                            return currentNode;
                        }
                        currentNode = currentNode.parent;
                    }
                    return null;
                }