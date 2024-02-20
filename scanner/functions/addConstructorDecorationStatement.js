function addConstructorDecorationStatement(statements, node) {
                const expression = generateConstructorDecorationExpression(node);
                if (expression) {
                    statements.push(setOriginalNode(factory2.createExpressionStatement(expression), node));
                }
            }