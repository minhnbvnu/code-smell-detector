function visitExpressionWithTypeArgumentsInHeritageClause(node) {
                var _a2;
                const facts = ((_a2 = lexicalEnvironment == null ? void 0 : lexicalEnvironment.data) == null ? void 0 : _a2.facts) || 0 /* None */;
                if (facts & 4 /* NeedsClassSuperReference */) {
                    const temp = factory2.createTempVariable(hoistVariableDeclaration, 
                    /*reserveInNestedScopes*/
                    true);
                    getClassLexicalEnvironment().superClassReference = temp;
                    return factory2.updateExpressionWithTypeArguments(node, factory2.createAssignment(temp, visitNode(node.expression, visitor, isExpression)), 
                    /*typeArguments*/
                    void 0);
                }
                return visitEachChild(node, visitor, context);
            }