function createBaseElementAccessExpression(expression, questionDotToken, argumentExpression) {
                const node = createBaseDeclaration(209 /* ElementAccessExpression */);
                node.expression = expression;
                node.questionDotToken = questionDotToken;
                node.argumentExpression = argumentExpression;
                node.transformFlags |= propagateChildFlags(node.expression) | propagateChildFlags(node.questionDotToken) | propagateChildFlags(node.argumentExpression);
                node.jsDoc = void 0;
                node.flowNode = void 0;
                return node;
            }