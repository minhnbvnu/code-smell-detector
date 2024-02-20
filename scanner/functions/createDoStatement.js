function createDoStatement(statement, expression) {
                const node = createBaseNode(243 /* DoStatement */);
                node.statement = asEmbeddedStatement(statement);
                node.expression = expression;
                node.transformFlags |= propagateChildFlags(node.statement) | propagateChildFlags(node.expression);
                node.jsDoc = void 0;
                node.flowNode = void 0;
                return node;
            }