function visitPreOrPostfixUnaryExpression(node, valueIsDiscarded) {
                if ((node.operator === 45 /* PlusPlusToken */ || node.operator === 46 /* MinusMinusToken */) && isIdentifier(node.operand) && !isGeneratedIdentifier(node.operand) && !isLocalName(node.operand) && !isDeclarationNameOfEnumOrNamespace(node.operand)) {
                    const exportedNames = getExports(node.operand);
                    if (exportedNames) {
                        let temp;
                        let expression = visitNode(node.operand, visitor, isExpression);
                        if (isPrefixUnaryExpression(node)) {
                            expression = factory2.updatePrefixUnaryExpression(node, expression);
                        }
                        else {
                            expression = factory2.updatePostfixUnaryExpression(node, expression);
                            if (!valueIsDiscarded) {
                                temp = factory2.createTempVariable(hoistVariableDeclaration);
                                expression = factory2.createAssignment(temp, expression);
                                setTextRange(expression, node);
                            }
                            expression = factory2.createComma(expression, factory2.cloneNode(node.operand));
                            setTextRange(expression, node);
                        }
                        for (const exportName of exportedNames) {
                            noSubstitution[getNodeId(expression)] = true;
                            expression = createExportExpression(exportName, expression);
                            setTextRange(expression, node);
                        }
                        if (temp) {
                            noSubstitution[getNodeId(expression)] = true;
                            expression = factory2.createComma(expression, temp);
                            setTextRange(expression, node);
                        }
                        return expression;
                    }
                }
                return visitEachChild(node, visitor, context);
            }