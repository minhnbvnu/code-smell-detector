function visitPropertyNameOfClassElement(member) {
                const name = member.name;
                if (isComputedPropertyName(name) && (!hasStaticModifier(member) && currentClassHasParameterProperties || hasDecorators(member) && legacyDecorators)) {
                    const expression = visitNode(name.expression, visitor, isExpression);
                    Debug.assert(expression);
                    const innerExpression = skipPartiallyEmittedExpressions(expression);
                    if (!isSimpleInlineableExpression(innerExpression)) {
                        const generatedName = factory2.getGeneratedNameForNode(name);
                        hoistVariableDeclaration(generatedName);
                        return factory2.updateComputedPropertyName(name, factory2.createAssignment(generatedName, expression));
                    }
                }
                return Debug.checkDefined(visitNode(name, visitor, isPropertyName));
            }