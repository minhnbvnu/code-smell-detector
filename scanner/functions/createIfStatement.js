function createIfStatement(expression, thenStatement, elseStatement) {
                const node = createBaseNode(242 /* IfStatement */);
                node.expression = expression;
                node.thenStatement = asEmbeddedStatement(thenStatement);
                node.elseStatement = asEmbeddedStatement(elseStatement);
                node.transformFlags |= propagateChildFlags(node.expression) | propagateChildFlags(node.thenStatement) | propagateChildFlags(node.elseStatement);
                node.jsDoc = void 0;
                node.flowNode = void 0;
                return node;
            }