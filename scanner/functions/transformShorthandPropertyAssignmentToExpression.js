function transformShorthandPropertyAssignmentToExpression(property, receiver, startsOnNewLine) {
                const expression = factory2.createAssignment(createMemberAccessForPropertyName(factory2, receiver, Debug.checkDefined(visitNode(property.name, visitor, isPropertyName))), factory2.cloneNode(property.name));
                setTextRange(expression, property);
                if (startsOnNewLine) {
                    startOnNewLine(expression);
                }
                return expression;
            }