function createWhileStatement(expression, statement) {
                const node = createBaseNode(244 /* WhileStatement */);
                node.expression = expression;
                node.statement = asEmbeddedStatement(statement);
                node.transformFlags |= propagateChildFlags(node.expression) | propagateChildFlags(node.statement);
                node.jsDoc = void 0;
                node.flowNode = void 0;
                return node;
            }