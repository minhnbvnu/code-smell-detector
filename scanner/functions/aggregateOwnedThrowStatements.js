function aggregateOwnedThrowStatements(node) {
                        if (isThrowStatement(node)) {
                            return [node];
                        }
                        else if (isTryStatement(node)) {
                            return concatenate(node.catchClause ? aggregateOwnedThrowStatements(node.catchClause) : node.tryBlock && aggregateOwnedThrowStatements(node.tryBlock), node.finallyBlock && aggregateOwnedThrowStatements(node.finallyBlock));
                        }
                        return isFunctionLike(node) ? void 0 : flatMapChildren(node, aggregateOwnedThrowStatements);
                    }