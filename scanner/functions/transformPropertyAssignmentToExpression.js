function transformPropertyAssignmentToExpression(property, receiver, startsOnNewLine) {
                const expression = factory2.createAssignment(createMemberAccessForPropertyName(factory2, receiver, Debug.checkDefined(visitNode(property.name, visitor, isPropertyName))), Debug.checkDefined(visitNode(property.initializer, visitor, isExpression)));
                setTextRange(expression, property);
                if (startsOnNewLine) {
                    startOnNewLine(expression);
                }
                return expression;
            }