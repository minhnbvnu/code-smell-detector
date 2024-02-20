function wrapPrivateIdentifierForDestructuringTarget(node) {
                const parameter = factory2.getGeneratedNameForNode(node);
                const info = accessPrivateIdentifier2(node.name);
                if (!info) {
                    return visitEachChild(node, visitor, context);
                }
                let receiver = node.expression;
                if (isThisProperty(node) || isSuperProperty(node) || !isSimpleCopiableExpression(node.expression)) {
                    receiver = factory2.createTempVariable(hoistVariableDeclaration, 
                    /*reservedInNestedScopes*/
                    true);
                    getPendingExpressions().push(factory2.createBinaryExpression(receiver, 63 /* EqualsToken */, visitNode(node.expression, visitor, isExpression)));
                }
                return factory2.createAssignmentTargetWrapper(parameter, createPrivateIdentifierAssignment(info, receiver, parameter, 63 /* EqualsToken */));
            }