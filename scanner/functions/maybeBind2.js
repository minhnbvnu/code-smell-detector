function maybeBind2(node) {
                    if (node && isBinaryExpression(node) && !isDestructuringAssignment(node)) {
                        return node;
                    }
                    bind(node);
                }