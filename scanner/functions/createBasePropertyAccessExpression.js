function createBasePropertyAccessExpression(expression, questionDotToken, name) {
                const node = createBaseDeclaration(208 /* PropertyAccessExpression */);
                node.expression = expression;
                node.questionDotToken = questionDotToken;
                node.name = name;
                node.transformFlags = propagateChildFlags(node.expression) | propagateChildFlags(node.questionDotToken) | (isIdentifier(node.name) ? propagateIdentifierNameFlags(node.name) : propagateChildFlags(node.name) | 536870912 /* ContainsPrivateIdentifierInExpression */);
                node.jsDoc = void 0;
                node.flowNode = void 0;
                return node;
            }