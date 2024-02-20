function createForInStatement(initializer, expression, statement) {
                const node = createBaseNode(246 /* ForInStatement */);
                node.initializer = initializer;
                node.expression = expression;
                node.statement = asEmbeddedStatement(statement);
                node.transformFlags |= propagateChildFlags(node.initializer) | propagateChildFlags(node.expression) | propagateChildFlags(node.statement);
                node.jsDoc = void 0;
                node.locals = void 0;
                node.nextContainer = void 0;
                node.flowNode = void 0;
                return node;
            }