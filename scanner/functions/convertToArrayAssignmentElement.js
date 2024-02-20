function convertToArrayAssignmentElement(element) {
                if (isBindingElement(element)) {
                    if (element.dotDotDotToken) {
                        Debug.assertNode(element.name, isIdentifier);
                        return setOriginalNode(setTextRange(factory2.createSpreadElement(element.name), element), element);
                    }
                    const expression = convertToAssignmentElementTarget(element.name);
                    return element.initializer ? setOriginalNode(setTextRange(factory2.createAssignment(expression, element.initializer), element), element) : expression;
                }
                return cast(element, isExpression);
            }