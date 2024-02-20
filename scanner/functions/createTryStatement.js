function createTryStatement(tryBlock, catchClause, finallyBlock) {
                const node = createBaseNode(255 /* TryStatement */);
                node.tryBlock = tryBlock;
                node.catchClause = catchClause;
                node.finallyBlock = finallyBlock;
                node.transformFlags |= propagateChildFlags(node.tryBlock) | propagateChildFlags(node.catchClause) | propagateChildFlags(node.finallyBlock);
                node.jsDoc = void 0;
                node.flowNode = void 0;
                return node;
            }