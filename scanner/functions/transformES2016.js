function transformES2016(context) {
            const { factory: factory2, hoistVariableDeclaration } = context;
            return chainBundle(context, transformSourceFile);
            function transformSourceFile(node) {
                if (node.isDeclarationFile) {
                    return node;
                }
                return visitEachChild(node, visitor, context);
            }
            function visitor(node) {
                if ((node.transformFlags & 512 /* ContainsES2016 */) === 0) {
                    return node;
                }
                switch (node.kind) {
                    case 223 /* BinaryExpression */:
                        return visitBinaryExpression(node);
                    default:
                        return visitEachChild(node, visitor, context);
                }
            }
            function visitBinaryExpression(node) {
                switch (node.operatorToken.kind) {
                    case 67 /* AsteriskAsteriskEqualsToken */:
                        return visitExponentiationAssignmentExpression(node);
                    case 42 /* AsteriskAsteriskToken */:
                        return visitExponentiationExpression(node);
                    default:
                        return visitEachChild(node, visitor, context);
                }
            }
            function visitExponentiationAssignmentExpression(node) {
                let target;
                let value;
                const left = visitNode(node.left, visitor, isExpression);
                const right = visitNode(node.right, visitor, isExpression);
                if (isElementAccessExpression(left)) {
                    const expressionTemp = factory2.createTempVariable(hoistVariableDeclaration);
                    const argumentExpressionTemp = factory2.createTempVariable(hoistVariableDeclaration);
                    target = setTextRange(factory2.createElementAccessExpression(setTextRange(factory2.createAssignment(expressionTemp, left.expression), left.expression), setTextRange(factory2.createAssignment(argumentExpressionTemp, left.argumentExpression), left.argumentExpression)), left);
                    value = setTextRange(factory2.createElementAccessExpression(expressionTemp, argumentExpressionTemp), left);
                }
                else if (isPropertyAccessExpression(left)) {
                    const expressionTemp = factory2.createTempVariable(hoistVariableDeclaration);
                    target = setTextRange(factory2.createPropertyAccessExpression(setTextRange(factory2.createAssignment(expressionTemp, left.expression), left.expression), left.name), left);
                    value = setTextRange(factory2.createPropertyAccessExpression(expressionTemp, left.name), left);
                }
                else {
                    target = left;
                    value = left;
                }
                return setTextRange(factory2.createAssignment(target, setTextRange(factory2.createGlobalMethodCall("Math", "pow", [value, right]), node)), node);
            }
            function visitExponentiationExpression(node) {
                const left = visitNode(node.left, visitor, isExpression);
                const right = visitNode(node.right, visitor, isExpression);
                return setTextRange(factory2.createGlobalMethodCall("Math", "pow", [left, right]), node);
            }
        }