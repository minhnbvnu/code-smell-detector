function aggregateAllBreakAndContinueStatements(node) {
                        return isBreakOrContinueStatement(node) ? [node] : isFunctionLike(node) ? void 0 : flatMapChildren(node, aggregateAllBreakAndContinueStatements);
                    }