function createBaseCallExpression(expression, questionDotToken, typeArguments, argumentsArray) {
                const node = createBaseDeclaration(210 /* CallExpression */);
                node.expression = expression;
                node.questionDotToken = questionDotToken;
                node.typeArguments = typeArguments;
                node.arguments = argumentsArray;
                node.transformFlags |= propagateChildFlags(node.expression) | propagateChildFlags(node.questionDotToken) | propagateChildrenFlags(node.typeArguments) | propagateChildrenFlags(node.arguments);
                if (node.typeArguments) {
                    node.transformFlags |= 1 /* ContainsTypeScript */;
                }
                if (isSuperProperty(node.expression)) {
                    node.transformFlags |= 16384 /* ContainsLexicalThis */;
                }
                return node;
            }