function maybeCheckExpression(state, node) {
                    if (isBinaryExpression(node)) {
                        return node;
                    }
                    setLastResult(state, checkExpression(node, state.checkMode));
                }