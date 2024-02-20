function getPropertyNameExpressionIfNeeded(name, shouldHoist, captureReferencedName) {
                if (isComputedPropertyName(name)) {
                    const cacheAssignment = findComputedPropertyNameCacheAssignment(name);
                    let expression = visitNode(name.expression, visitor, isExpression);
                    const innerExpression = skipPartiallyEmittedExpressions(expression);
                    const inlinable = isSimpleInlineableExpression(innerExpression);
                    const alreadyTransformed = !!cacheAssignment || isAssignmentExpression(innerExpression) && isGeneratedIdentifier(innerExpression.left);
                    if (!alreadyTransformed && !inlinable && shouldHoist) {
                        const generatedName = factory2.getGeneratedNameForNode(name);
                        if (resolver.getNodeCheckFlags(name) & 32768 /* BlockScopedBindingInLoop */) {
                            addBlockScopedVariable(generatedName);
                        }
                        else {
                            hoistVariableDeclaration(generatedName);
                        }
                        if (captureReferencedName) {
                            expression = emitHelpers().createPropKeyHelper(expression);
                        }
                        return factory2.createAssignment(generatedName, expression);
                    }
                    return inlinable || isIdentifier(innerExpression) ? void 0 : expression;
                }
            }