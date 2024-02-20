function convertToObjectAssignmentElement(element) {
                if (isBindingElement(element)) {
                    if (element.dotDotDotToken) {
                        Debug.assertNode(element.name, isIdentifier);
                        return setOriginalNode(setTextRange(factory2.createSpreadAssignment(element.name), element), element);
                    }
                    if (element.propertyName) {
                        const expression = convertToAssignmentElementTarget(element.name);
                        return setOriginalNode(setTextRange(factory2.createPropertyAssignment(element.propertyName, element.initializer ? factory2.createAssignment(expression, element.initializer) : expression), element), element);
                    }
                    Debug.assertNode(element.name, isIdentifier);
                    return setOriginalNode(setTextRange(factory2.createShorthandPropertyAssignment(element.name, element.initializer), element), element);
                }
                return cast(element, isObjectLiteralElementLike);
            }