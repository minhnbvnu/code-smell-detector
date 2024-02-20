function visitReferencedPropertyName(node) {
                if (isPropertyNameLiteral(node) || isPrivateIdentifier(node)) {
                    const referencedName2 = factory2.createStringLiteralFromNode(node);
                    const name2 = visitNode(node, visitor, isPropertyName);
                    return { referencedName: referencedName2, name: name2 };
                }
                if (isPropertyNameLiteral(node.expression) && !isIdentifier(node.expression)) {
                    const referencedName2 = factory2.createStringLiteralFromNode(node.expression);
                    const name2 = visitNode(node, visitor, isPropertyName);
                    return { referencedName: referencedName2, name: name2 };
                }
                const referencedName = factory2.getGeneratedNameForNode(node);
                hoistVariableDeclaration(referencedName);
                const key = emitHelpers().createPropKeyHelper(visitNode(node.expression, visitor, isExpression));
                const assignment = factory2.createAssignment(referencedName, key);
                const name = factory2.updateComputedPropertyName(node, injectPendingExpressions(assignment));
                return { referencedName, name };
            }